import { Request, Response, NextFunction } from 'express';
import cache from '../utils/Cache';

// Extendemos el tipo Response para incluir sendResponse
declare module 'express-serve-static-core' {
	interface Response {
		sendResponse?: (body?: any) => Response;
	}
}

const generateCacheKey = (req: Request): string => {
	return `${req.method}-${req.originalUrl}`;
};

const cacheMiddleware = () => {
	return (req: Request, res: Response, next: NextFunction) => {
		const key = generateCacheKey(req);
		const cachedResponse = cache.get(key);
		if (cachedResponse) {
			res.send(cachedResponse);
		} else {
			res.sendResponse = res.send;
			res.send = (body: any): Response<any, Record<string, any>> => { // Update the type of the res.send function
				cache.set(key, body);
				return res.sendResponse?.(body) as Response<any, Record<string, any>>; // Return the response
			};
			next();
		}
	};
}


export default cacheMiddleware;
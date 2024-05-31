import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";

config({ path: "./.env" });

class Seguridad {
	public revisar(req: Request, res: Response, next: NextFunction) {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(401).json({ Respuesta: "Falta el token de autorización" });
		}

		const tokenParts = authHeader.split(" ");
		if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
			return res.status(401).json({ Respuesta: "Formato del token incorrecto" });
		}

		const token = tokenParts[1];
		try {
			const secretKey = process.env.JWT_SECRET_KEY || 'LaSuperClave';
			const decoded = jwt.verify(token, secretKey);
			(req as any).user = decoded; // Attach decoded token to the request object
			next();
		} catch (error) {
			if (error instanceof jwt.TokenExpiredError) {
				return res.status(401).json({ Respuesta: "El token ha expirado" });
			} else if (error instanceof jwt.JsonWebTokenError) {
				return res.status(401).json({ Respuesta: "El token no es válido" });
			} else {
				return res.status(500).json({ Respuesta: "Error al procesar el token" });
			}
		}
	}
}

const seguridad = new Seguridad();
export default seguridad;

import { Request, Response } from "express";
import { Token } from "../interface/interfaces";
import tokenDAO from "../dao/tokenDAO";

class tokenController {
	public async createToken(req: Request, res: Response): Promise<void> {
		const { username, password } = req.body;
		const data: Token[] = [username, password];

		const result = await tokenDAO.generateToken(data);

		if (result.isSuccess) {
			res.status(200).json(result.getValue())
		} else {
			res.status(400).json({ respuesta: result.errorValue() });
		}
	}
}

const TokenController = new tokenController();
export default TokenController;
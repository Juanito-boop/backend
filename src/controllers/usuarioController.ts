import { Request, Response } from "express";
import { User, UsuarioCreationResult, UsuarioR } from "../interface/interfaces";
import UsuarioDAO from "../dao/usuarioDAO";
import Result from "../utils/Result";

class usuarioController {
	public async insertUser(req: Request, res: Response): Promise<void> {
		const { nombre, apellido, email, username, password_hash, avatar_url, role } = req.body;

		if (typeof nombre !== 'string' || 
			typeof apellido !== 'string' || 
			typeof email !== 'string' || 
			typeof username !== 'string' || 
			typeof password_hash != 'string' || 
			typeof avatar_url !== 'string' ||
			typeof role !== "number"
			) {
			res.status(400).json({ Respuesta: "Invalid input data types" });
			return;
		}

		const data = { nombre, apellido, email, username, password_hash, avatar_url, role };
		const result: Result<UsuarioCreationResult> = await UsuarioDAO.createUser(data);

		if (result.isSuccess) {
			res.status(200).json(result.getValue());
		} else {
			res.status(400).json({ Respuesta: result.errorValue() });
		}
	} 

	public async fetchUser(req: Request, res: Response): Promise<void>{
		const username: string = req.params.username;		
		const result = await UsuarioDAO.getUser(username);

		if (result.isSuccess) {
			res.status(200).json(result.getValue());
		} else {
			res.status(400).json({ Respuesta: result.errorValue() });
		}
	}
}

const UsuarioController = new usuarioController();
export default UsuarioController;
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import UsuarioDAO from "../dao/usuarioDAO";
import { User, UsuarioCreationResult } from "../interface/interfaces";
import Result from "../utils/Result";

class usuarioController {
	public async insertUser(req: Request, res: Response): Promise<void> {
		const { nombre, apellido, email, username, password, avatar_url, role } =
			req.body;

		if (
			typeof nombre !== "string" ||
			typeof apellido !== "string" ||
			typeof email !== "string" ||
			typeof username !== "string" ||
			typeof password !== "string" ||
			typeof avatar_url !== "string" ||
			typeof role !== "number"
		) {
			res.status(400).json({ Respuesta: "Invalid input data types" });
			return;
		}

		try {
			const saltRounds = 10;
			const hashedPassword = await bcrypt.hash(password, saltRounds);

			const data = { nombre, apellido, email, username, password: hashedPassword, avatar_url, role,};
			const result: Result<UsuarioCreationResult, string> =
				await UsuarioDAO.createUser(data);

			if (result.isSuccess) {
				res.status(200).json(result.getValue());
			} else {
				res.status(400).json({ Respuesta: result.errorValue() });
			}
		} catch (error: any) {
			res
				.status(500)
				.json({ Respuesta: `Error al crear el usuario: ${error.message}` });
		}
	}

	public async insertMultipleUsers(req: Request, res: Response): Promise<void> {
		const users = req.body;

		if (!Array.isArray(users)) {
			res.status(400).json({ Respuesta: "Se esperaba un array de usuarios" });
			return;
		}

		try {
			const insertions = users.map(async (user) => {
				const { nombre, apellido, email, username, password, avatar_url, role } = user;

				if (!password) {
					throw new Error(
						"Contraseña no proporcionada para el usuario " + username
					);
				}

				const saltRounds = 10;
				const hashedPassword = await bcrypt.hash(password, saltRounds);
				const userData = { nombre, apellido, email, username, password: hashedPassword, avatar_url, role };

				return UsuarioDAO.createUser(userData);
			});

			const results = await Promise.all(insertions);
			const failed = results.filter((result) => !result.isSuccess);

			if (failed.length > 0) {
				res
					.status(400)
					.json({ Respuesta: "Error en algunas inserciones", errores: failed });
			} else {
				res
					.status(200)
					.json({ Respuesta: "Todos los usuarios insertados exitosamente" });
			}
		} catch (error: any) {
			res
				.status(500)
				.json({ Respuesta: `Error al crear usuarios: ${error.message}` });
		}
	}
	public async fetchUser(req: Request, res: Response): Promise<void> {
		const username: string = req.params.username;
		try {
			await UsuarioDAO.updateUserLoginTimestamp(username);
			const result: Result<User, string> = await UsuarioDAO.getUser(username);

			if (result.isSuccess) {
				res.status(200).json(result.getValue());
			} else {
				res.status(400).json({ Respuesta: result.errorValue() });
			}
		} catch (error: any) {
			res
				.status(500)
				.json({ Respuesta: `Error al obtener el usuario: ${error.message}` });
		}
	}
}

const UsuarioController = new usuarioController();
export default UsuarioController;
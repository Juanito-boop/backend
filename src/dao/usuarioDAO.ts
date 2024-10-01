import pool from "../config/connection/conexion";
import { User, Usuario, UsuarioCreationResult, UsuarioR } from "../interface/interfaces";
import { SQL_USUARIO } from "../repository/crudSQL";
import Result from "../utils/Result";

export default class UsuarioDAO {
	public static async createUser(data: Omit<User, 'id_usuario'>): Promise<Result<UsuarioCreationResult>> {
		const {nombre, apellido, email, username, password_hash, avatar_url, role} = data;
		const existingUser = await pool.oneOrNone(SQL_USUARIO.checkUserExists, [email, username]);

		if (existingUser?.exists) {
			return Result.fail("El usuario ya existe");
		}

		try {
			const result: UsuarioCreationResult = await pool.task(async (consulta) => {
				return await consulta.one<UsuarioCreationResult>(
					SQL_USUARIO.insertUser, [
						nombre, 
						apellido, 
						email, 
						username, 
						password_hash, 
						avatar_url, 
						role
					]
				);
			});

			return Result.success({ id_usuario: result.id_usuario });
		} catch (error) {
			return Result.fail(`No se puede crear el usuario, ${error}`);
		}
	}

	public static async getUser(username: string): Promise<Result<User>> {
		try {
			const result: User = await pool.one(SQL_USUARIO.fetchUser, username);
			return Result.success(result);
		} catch (error) {
			return Result.fail(`No se puede obtener los usuarios, ${error}`);
		}
	}
}
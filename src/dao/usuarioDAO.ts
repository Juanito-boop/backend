import pool from "../config/connection/conexion";
import { User, UsuarioCreationResult } from "../interface/interfaces";
import { SQL_USUARIO } from "../repository/crudSQL";
import Result from "../utils/Result";

export default class UsuarioDAO {
	public static async createUser(data: Omit<User, "user_id" |"created_at"| "updated_at">): Promise<Result<UsuarioCreationResult>> {
		const { email, username } = data;

		const existingUser = await pool.oneOrNone(SQL_USUARIO.checkUserExists, [email, username]);
		return existingUser?.exists? Result.fail("El usuario ya existe"): await this.insertNewUser(data);
	}

	private static async insertNewUser(data: Omit<User, "user_id" |"created_at"| "updated_at">): Promise<Result<UsuarioCreationResult>> {
		try {
			const result = await pool.task(async (consulta) => {
				return await consulta.one<UsuarioCreationResult>(
					SQL_USUARIO.insertUser,
					[
						data.nombre, data.apellido, data.email,
						data.username, data.password, data.avatar_url,
						data.role,
					]
				);
			});
			return Result.success({ user_id: result.user_id });
		} catch (error) {
			return Result.fail(`No se puede crear el usuario, El usuario ya existe\n ${error}`);
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

	public static async updateUserLoginTimestamp(username: string): Promise<void> {
		try {
			const query = `UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE username = $1;`;
			await pool.none(query, username);
		} catch (error: any) {
			throw new Error(
				`Error al actualizar el timestamp de login: ${error.message}`
			);
		}
	}
}
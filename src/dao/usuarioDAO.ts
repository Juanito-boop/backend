import pool from "../config/connection/conexion";
import { Usuario, UsuarioBulkResult, UsuarioCreationResult, UsuarioR } from "../interface/interfaces";
import { SQL_USUARIO } from "../repository/crudSQL";
import Result from "../utils/Result";

export default class UsuarioDAO {
  public static async createUser(data: Omit<Usuario, 'id_usuario'>): Promise<Result<UsuarioCreationResult>> {
    const {username, password, id_tienda, id_rol} = data;
    const existingUser = await pool.oneOrNone(SQL_USUARIO.checkUserExists, [username, id_tienda]);

    if (existingUser?.exists) {
      return Result.fail("El usuario ya existe");
    }

    try {
      const result: UsuarioCreationResult = await pool.task(async (consulta) => {
        return await consulta.one<UsuarioCreationResult>(SQL_USUARIO.insertUser, [username, password, id_tienda, id_rol]);
      });

      return Result.success({ id_usuario: result.id_usuario });
    } catch (error) {
      return Result.fail(`No se puede crear el usuario, ${error}`);
    }
  }

  public static async createUsers(data: Omit<Usuario, 'id_usuario'>[]): Promise<Result<UsuarioBulkResult>> {
    const created: UsuarioCreationResult[] = [];
    const errors: string[] = [];

    for (const user of data) {
      const { username, password, id_tienda, id_rol } = user;
      const existingUser = await pool.oneOrNone(SQL_USUARIO.checkUserExists, [username, id_tienda]);

      if (existingUser) {
        errors.push(`El usuario ${username} ya existe en la tienda ${id_tienda}`);
        continue;
      }

      try {
        const result: UsuarioCreationResult = await pool.task(async (consulta) => {
          return await consulta.one<UsuarioCreationResult>(SQL_USUARIO.insertUser, [username, password, id_tienda, id_rol]);
        });
        created.push({ id_usuario: result.id_usuario });
      } catch (error) {
        errors.push(`No se puede crear el usuario ${username}, ${error}`);
      }
    }
    return Result.success({ created, errors });
  }

  public static async fetchUsers(tienda: number): Promise<Result<Usuario[]>> {
    try {
      const result: Usuario[] = await pool.manyOrNone(SQL_USUARIO.fetchUsers, tienda);
      return Result.success(result);
    } catch (error) {
      return Result.fail(`No se puede obtener los usuarios, ${error}`);
    }
  }

  public static async finAllUsers(): Promise<Result<UsuarioR[]>> {
    try {
      const result: UsuarioR[] = await pool.manyOrNone(SQL_USUARIO.findAllUsers);
      return Result.success(result);
    } catch (error) {
      return Result.fail(`No se puede obtener los usuarios, ${error}`);
    }
  }

  public static async filterUserByStoreAndId(tienda: number, idUsuario: number): Promise<Result<Usuario | null>> {
    try {
      const result: Usuario | null = await pool.oneOrNone(SQL_USUARIO.findUserByStoreAndId, [idUsuario, tienda]);
      return Result.success(result);
    }catch(error){
      return Result.fail(`No se puede obtener el usuario, ${error}`);
    }
  }

  public static async updateUser(fieldsToUpdate: { [key: string]: any }, idUsuario: number, tienda: number): Promise<Result<void>> {
    if (Object.keys(fieldsToUpdate).length === 0) {
      return Result.fail("No se proporcionaron campos para actualizar");
    }

    const existingUser = await pool.oneOrNone(SQL_USUARIO.checkUserExists, [idUsuario, tienda]);

    if (!existingUser) {
      return Result.fail("Usuario no encontrado");
    }

    try {
      const setClause = Object.keys(fieldsToUpdate)
        .map((field, index) => `${field} = $${index + 1}`)
        .join(", ");
      
      const values = Object.values(fieldsToUpdate);
      values.push(idUsuario, tienda);

      const sqlUpdate = `UPDATE usuarios SET ${setClause} WHERE id_usuario = $${values.length - 1} AND id_tienda = $${values.length}`;

      await pool.query(sqlUpdate, values);
      return Result.success();
    } catch (error) {
      return Result.fail(`No se puede actualizar el usuario, ${error}`);
    }
  }

  public static async deleteUser(tienda: number, idUsuario: number) {
    const existingUser = await pool.oneOrNone(SQL_USUARIO.checkUserExists, [idUsuario, tienda]);

    if (!existingUser) {
      return Result.fail("Usuario no encontrado");
    }

    try {
      await pool.query(SQL_USUARIO.deleteUser, [idUsuario, tienda]);
      return Result.success();
    } catch (error) {
      return Result.fail(`No se puede eliminar el usuario, ${error}`);
    }
  }
}
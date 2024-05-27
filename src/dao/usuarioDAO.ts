import { Response } from "express";
import pool from "../config/connection/conexion";
import { Usuario, UsuarioCreationResult } from "../interface/interfaces";
import { SQL_USUARIO } from "../repository/crudSQL";
import Result from "../utils/Result";

export default class UsuarioDAO {
  public static async createUser(data: Usuario[]): Promise<Result<UsuarioCreationResult>> {
    try {
      const existingUser = await pool.oneOrNone(SQL_USUARIO.checkUserExists, [
        data[0].id_usuario, 
        data[0].id_tienda
      ]);

      if (existingUser) {
        return Result.fail("El usuario ya existe");
      }

      const result: UsuarioCreationResult = await pool.task(async (consulta) => {
        return await consulta.one<UsuarioCreationResult>(SQL_USUARIO.insertUser, data);
      });

      return Result.succes({id_usuario:  result.id_usuario});
    } catch (error) {
      return Result.fail(`No se puede crear el usuario, ${error}`);
    }
  }

  public static async fetchUsers(tienda: number): Promise<Result<Usuario[]>> {
    try {
      const result: Usuario[] = await pool.manyOrNone(SQL_USUARIO.fetchUsers, tienda);
      return Result.succes(result);
    } catch (error) {
      return Result.fail(`No se puede obtener los usuarios, ${error}`);
    }
  }

  public static async filterUserByStoreAndId(tienda: number, idUsuario: number): Promise<Result<Usuario | null>> {
    try {
      const result: Usuario | null = await pool.oneOrNone(SQL_USUARIO.findUserByStoreAndId, [idUsuario, tienda]);
      return Result.succes(result);
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
      return Result.succes();
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
      return Result.succes();
    } catch (error) {
      return Result.fail(`No se puede eliminar el usuario, ${error}`);
    }
  }
}
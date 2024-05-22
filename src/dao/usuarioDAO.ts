import { Response } from "express";
import pool from "../config/connection/conexion";
import { Usuario, UsuarioCreationResult } from "../interface/interfaces";
import { SQL_USUARIO } from "../repository/crudSQL";

export default class UsuarioDAO {
  public static async createUser(data: Usuario[], res: Response) {
    try {
      const result: UsuarioCreationResult = await pool.task(async (consulta) => {
        return await consulta.one(SQL_USUARIO.insertUser, data);
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede crear el usuario, ${error}` });
    }
  }

  public static async fetchUsers(tienda: number, res: Response) {
    try {
      const result: Usuario[] = await pool.task(async (consulta) => {
        return await consulta.many(SQL_USUARIO.fetchUsers, tienda);
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede obtener los usuarios, ${error}` });
    }
  }

  public static async filterUserByStoreAndId(tienda: number, idUsuario: number, res: Response) {
    try {
      const result: Usuario | null = await pool.oneOrNone(SQL_USUARIO.findUserByStoreAndId, [idUsuario, tienda]);
      res.status(200).json(result);
    }catch(error){
      res.status(400).json({ Respuesta: `No se puede obtener el usuario, ${error}` });
      return null;
    }
  }

  public static async updateUser(fieldsToUpdate: { [key: string]: any }, idUsuario: number, tienda: number, res: Response) {
    if (Object.keys(fieldsToUpdate).length === 0) {
      res.status(400).json({ Respuesta: "No se proporcionaron campos para actualizar" });
    }

    const existingUser = await pool.oneOrNone(SQL_USUARIO.checkUserExists, [idUsuario, tienda]);

    if (!existingUser) {
      res.status(404).json({ Respuesta: "Usuario no encontrado" });
      return;
    }

    try {
      const setClause = Object.keys(fieldsToUpdate)
        .map((field, index) => `${field} = $${index + 1}`)
        .join(", ");
      
      const values = Object.values(fieldsToUpdate);
      values.push(idUsuario, tienda);

      const sqlUpdate = `UPDATE usuarios SET ${setClause} WHERE id_usuario = $${values.length - 1} AND id_tienda = $${values.length}`;

      const result = await pool.result(sqlUpdate, values);

      if(result.rowCount > 0) {
        res.status(200).json({ Respuesta: "Usuario actualizado" });
      } else {
        res.status(400).json({ Respuesta: "No se pudo actualizar el usuario" });
      }
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede actualizar el usuario, ${error}` });
    }
  }

  public static async deleteUser(tienda: number, idUsuario: number, res: Response) {
    const existingUser = await pool.oneOrNone(SQL_USUARIO.checkUserExists, [idUsuario, tienda]);

    if (!existingUser) {
      res.status(404).json({ Respuesta: "Usuario no encontrado" });
      return;
    }

    try {
      await pool.task(async (consulta) => {
        return await consulta.none(SQL_USUARIO.deleteUser, [idUsuario, tienda]);
      });

      res.status(200).json({ Respuesta: "Usuario eliminado" });
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede eliminar el usuario, ${error}` });
    }
  }
}
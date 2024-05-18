import { Response } from "express";
import { SQL_TOKEN } from "../repository/crudSQL";
import { Token } from "../interface/interfaces";
import pool from "../config/connection/conexion";

export default class tokenDAO {
  public static async generateToken(data: Token[], res: Response){
    try {
      const result: string = await pool.task(async (consulta) => {
        return await consulta.one(SQL_TOKEN.getUserToken, data);
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede generar el token, ${error}` });
    }
  }
}
import { config } from "dotenv";
import Jwt from "jsonwebtoken";
import pool from "../config/connection/conexion";
import { DataToken, Token } from "../interface/interfaces";
import { SQL_TOKEN } from "../repository/crudSQL";
import Result from "../utils/Result";

config({ path: "./.env" });

export default class tokenDAO {
  public static async generateToken(data: Token[]): Promise<Result<string>> {
    try {
      const result = await pool.result(SQL_TOKEN.getUserToken, data);

      if (result.rows.length === 0) {
        return Result.fail("No se encontraron registros");
      }

      const { username, id_tienda, nombre_rol } = result.rows[0] as DataToken;
      const secretKey = process.env.JWT_SECRET_KEY || 'LaSuperClave';

      const token = Jwt.sign(
        { username, id_tienda, nombre_rol },
        secretKey,
        { expiresIn: "8h" }
      );

      return Result.ok(token);
    } catch (error) {
      return Result.fail(`No se puede generar el token, ${(error as Error).message}`);
    }
  }
}
import pool from "../config/connection/conexion";
import { Rol } from "../interface/interfaces";
import { SQL_ROL } from "../repository/crudSQL";
import Result from "../utils/Result";

export default class rolDAO {
  public static async createRole(data: Rol[]) {
    try {
      const result = await pool.result(SQL_ROL.CREAR, data);

      if (result.rowCount === 0) {
        return Result.fail("No se pudo crear el rol");
      }

      return Result.succes("Rol creado con éxito");
    } catch (error) {
      return Result.fail(`No se puede crear el rol, ${(error as Error).message}`);
    }
  }

  public static async getRoles() {
    try {
      
    } catch (error) {
      
    }
  } 
}
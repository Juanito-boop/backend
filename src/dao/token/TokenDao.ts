
import { Response } from "express";
import Jwt from "jsonwebtoken";

import { SQL_TOKEN } from "../../respository/token/tokeRepo";
import pool from "../../config/connection/conexion";

class TokenDao {
  protected static async generar(res: Response, params: any[]): Promise<any> {
    pool
      .result(SQL_TOKEN.TOKEN, params)
      .then((registros: any) => {
        const token = Jwt.sign(
          registros.rows.at(0),'LaSuperClave',{expiresIn:"8h"});
        res.status(200).json(token);
      })
      .catch((miError) => {
        console.log(miError);
        res.status(400).json({ respuesta: "La consulta salio mal" });
      });
  }
}

export default TokenDao;

import { Response } from "express";
import pool from "../../../config/connection/conexion";

class ListarPorTiendaDAO {
  protected static async listarPorTienda(
    sql_listIDTienda: string,
    tienda: string,
    idecita: any,
    res: Response
  ): Promise<any> {
    await pool //await indica que espera que devuelva algo antes de dar respuesta
      .many(sql_listIDTienda, [tienda, idecita])
      .then((respuesta) => {
        console.log("=>" + respuesta);  
        return res.status(200).json(
            respuesta,
        );
    })
    .catch(() => {
      // console.log("=>", mierror);
      res.status(400).json({});
    });
  }
}

export default ListarPorTiendaDAO;
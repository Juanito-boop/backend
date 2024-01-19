import { Request, Response } from "express";
import pool from "../../../config/connection/conexion";
class listarDateDAO {
    protected static async listarDate(
        sql_listarDate: string,
        parametros: any,
        res: Response
    ): Promise<any> {
        pool.result(sql_listarDate, parametros)
            .then((obj) => {
                console.log(">>>>" + obj.rows);
                return res.status(200).json(
                     obj.rows,
                );
            })
            .catch((error) => {
                console.log("Hubo un error: ", error);
                res.status(400).json({
                    Mensaje: "Error listando productos Date",
                });
            });
    }
}

export default listarDateDAO;

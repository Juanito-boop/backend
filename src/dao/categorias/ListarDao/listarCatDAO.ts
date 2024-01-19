import { Request, Response } from "express";
import pool from "../../../config/connection/conexion";
class listarCatDAO {
    protected static async listar(
        sql_listar: string,
        parametros: any,
        res: Response
    ): Promise<any> {
        pool.result(sql_listar, parametros)
            .then((obj) => {
                console.log(">>>>" + obj.rows);
                return res.status(200).json(
                    obj.rows,
                );
            })
            .catch((error) => {
                console.log("Hubo un error: ", error);
                res.status(400).json({
                    Mensaje: "Error listando categorías",
                });
            });
    }
}

export default listarCatDAO;

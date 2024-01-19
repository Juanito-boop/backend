import { Request, Response } from "express";
import pool from "../../../config/connection/conexion";
class comprobacionSTDAO {
    protected static async listarPorId(
        sql_listStock: string,
        stock: any,
        res: Response
    ): Promise<any> {
        await pool //await indica que espera que devuelva algo antes de dar respuesta
            .one(sql_listStock, stock) //ponemos one porque solo traemos un dat, si no se maneja allresult o remian
            .then((respuesta) => {
                console.log("=>" + respuesta);
                return res
                    .status(200)
                    .json({
                        responde: respuesta,
                        idecita: stock,
                    });
            })
            .catch((mierror) => {
                console.log("=>", mierror);
                res.status(400).json({
                    respuesta: "Error, no hay informacion asociada a ese ID",
                    idecita: stock,
                });
            });
    }
}

export default comprobacionSTDAO;

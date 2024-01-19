import { Request, Response } from "express";
import pool from "../../../config/connection/conexion";
class ListarPorIdDAO {
    protected static async listarPorId(
        sql_listID: string,
        idecita: any,
        res: Response
    ): Promise<any> {
        await pool //await indica que espera que devuelva algo antes de dar respuesta
            .one(sql_listID, idecita) //ponemos one porque solo traemos un dat, si no se maneja allresult o remian
            .then((respuesta) => {
                console.log("=>" + respuesta);  
                return res.status(200).json(
                    respuesta,
                );
            })
            .catch((mierror) => {
                console.log("=>", mierror);
                res.status(400).json({
                    respuesta: "Error, no hay informacion asociada a ese ID",
                    idecita: idecita,
                });
            });
    }
}

export default ListarPorIdDAO;
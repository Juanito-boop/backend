import { Response } from "express";
import pool from "../../../config/connection/conexion";

class ListarRolDAO {
    protected static async listarTodosRoles(
        SQL_ROL: string,
        parametros: any,
        res: Response
    ): Promise<any> {
        pool.result(SQL_ROL, parametros)
            .then((obj) => {
                console.log("=>" + obj.rows);
                res.status(200).json(
                 
                     obj.rows,
                );
            })
            .catch((mierror) => {
                console.log("Error listando los roles", mierror);
                res.status(400).json({
                    respuesta: "Error en el el listar los roles",
                });
            });
    }
}

export default ListarRolDAO;

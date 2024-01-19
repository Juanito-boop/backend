import { Response } from "express";
import pool from "../../../config/connection/conexion";

class ListarUsuarioDAO {
    protected static async listarTodosUsuarios(
        SQL_USUARIO: string,
        parametros: any,
        res: Response
    ): Promise<any> {
        pool.result(SQL_USUARIO, parametros)
            .then((obj) => {
                console.log("=>" + obj.rows);
                res.status(200).json(
                     obj.rows,
                );
            })
            .catch((mierror) => {
                console.log("Error listando los usuarios", mierror);
                res.status(400).json({
                    respuesta: "Error en el el listar los usuarios",
                });
            });
    }
}

export default ListarUsuarioDAO;

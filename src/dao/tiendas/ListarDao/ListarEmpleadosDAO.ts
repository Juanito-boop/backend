import { Response } from "express";
import pool from "../../../config/connection/conexion";

class ListarTiendaDAO {
    protected static async listarEmpleadosTienda(
        SQL_TIENDA: string,
        parametros: any,
        res: Response
    ): Promise<any> {
        pool.result(SQL_TIENDA, parametros)
            .then((obj) => {
                console.log("=>" + obj.rows);
                res.status(200).json(
                 
                     obj.rows,
                );
            })
            .catch((mierror) => {
                console.log("Error listando las tiendas", mierror);
                res.status(400).json({
                    respuesta: "Error en el el listar las tiendas",
                });
            });
    }
}

export default ListarTiendaDAO;

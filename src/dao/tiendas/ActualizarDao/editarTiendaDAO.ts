import { Response } from "express";
import pool from "../../../config/connection/conexion";

class editarTiendaDAO {
    protected static async editarTienda(
        sqlActualizar: string,

        params: any,
        res: Response
    ): Promise<any> {
        await pool
            .none(sqlActualizar, params)
            .then((respuesta) => {
                console.log(respuesta);
                res.status(200).json({
                    respuesta: "Tienda actualizada",
                });
            })
            .catch((mierror) => {
                console.log("Error ", mierror);
                res.status(400).json({
                    respuesta: "Tienda no actualizada",
                });
            });
    }
}
export default editarTiendaDAO;

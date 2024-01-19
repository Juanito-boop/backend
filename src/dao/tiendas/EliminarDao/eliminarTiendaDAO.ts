import { Response } from "express";
import pool from "../../../config/connection/conexion";

class eliminarTiendaDAO {
    protected static async borraraPorIdTienda(
        sqlBorrar: string,
        params: any,
        res: Response
    ): Promise<any> {
        await pool
            .result(sqlBorrar, params)
            .then((dato) => {
                console.log(dato);
                return res.status(200).json({
                    mensaje: "Tienda Borrada",
                    resultado: dato.rowCount,
                });
            })
            .catch((mierror) => {
                console.log(mierror);
                res.status(200).json({
                    mensaje: "Error en tienda borrada",
                });
            });
    }
}

export default eliminarTiendaDAO;

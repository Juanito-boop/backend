import { Response } from "express";
import pool from "../../../config/connection/conexion";

class eliminarFactDAO {
    protected static async borrar(
        sqlBorrar: string,
        params: any,
        res: Response
    ): Promise<any> {
        await pool
            .result(sqlBorrar, params)
            .then((dato) => {
                console.log(dato);
                return res.status(200).json({
                    mensaje: "Factura borrada",
                    resultado: dato.rowCount,
                });
            })
            .catch((mierror) => {
                console.log(mierror);
                res.status(200).json({
                    mensaje: "Error en factura borrada",
                });
            });
    }
}
export default eliminarFactDAO;

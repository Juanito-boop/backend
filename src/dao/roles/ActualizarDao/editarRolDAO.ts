import { Response } from "express";
import pool from "../../../config/connection/conexion";

class editarRolDAO {
    protected static async editarRol(
        sqlActualizar: string,

        params: any,
        res: Response
    ): Promise<any> {
        await pool
            .none(sqlActualizar, params)
            .then((respuesta) => {
                console.log(respuesta);
                res.status(200).json({
                    respuesta: "Rol actualizado",
                });
            })
            .catch((mierror) => {
                console.log("Error ", mierror);
                res.status(400).json({
                    respuesta: "Rol no actualizada",
                });
            });
    }
}
export default editarRolDAO;

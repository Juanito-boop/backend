import { Response } from "express";
import pool from "../../../config/connection/conexion";

class editarUsuarioDAO {
    protected static async editarUsuario(
        sqlActualizar: string,

        params: any,
        res: Response
    ): Promise<any> {
        await pool
            .none(sqlActualizar, params)
            .then((respuesta) => {
                console.log(respuesta);
                res.status(200).json({
                    respuesta: "Usuario actualizado",
                });
            })
            .catch((mierror) => {
                console.log("Error ", mierror);
                res.status(400).json({
                    respuesta: "Usuario no actualizada",
                });
            });
    }
}
export default editarUsuarioDAO;

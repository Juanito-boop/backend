import { Response } from "express";
import pool from "../../../config/connection/conexion";

class editarProdDAO {
    protected static async editar(
        sqlActualizar: string,
        params: any,
        res: Response
    ): Promise<any> {
        await pool
            .task(async (consulta) => {
                return await consulta.result(sqlActualizar, params);
            })
            .then((respuesta) => {
                console.log(respuesta);
                res.status(200).json({
                    Respuesta: "Producto actualizado",
                });
            })
            .catch((error) => {
                console.log(`Error ${error}`);
                res.status(400).json({
                    Respuesta: "No se puede actualizar el prodcuto",
                });
            });
    }
}

export default editarProdDAO;

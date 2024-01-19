import { Response } from "express";
import pool from "../../../config/connection/conexion";

class crearProdDAO {
    protected static async crear(
        sqlConfirmar: string,
        sqlCrear: string,
        params: any,
        res: Response
    ): Promise<any> {
        await pool
            .task(async (consulta) => {
                const dato = await consulta.one(sqlConfirmar, params);
                if (dato.cantidad == 0) {
                    return await consulta.one(sqlCrear, params);
                } else {
                    return { id_producto: 0 };
                }
            })
            .then((respuesta) => {
                if (respuesta.id_producto != 0) {
                    res.status(200).json({
                        mensaje: "Producto creado",
                        nuevoCodigo: respuesta.id_producto,
                    });
                } else {
                    res.status(400).json({
                        respuesta: "Producto no creado, puede estar duplicada",
                    });
                }
            })
            .catch((error) => {
                console.log(`Error ${error}`);
                res.status(400).json({
                    respuesta: "Producto no creado",
                });
            });
    }
}
export default crearProdDAO;

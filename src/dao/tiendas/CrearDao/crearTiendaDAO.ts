import { Response } from "express";
import pool from "../../../config/connection/conexion";

class crearTiendaDAO {
    protected static async crearTienda(
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
                    return { id_tienda: 0 };
                }
            })
            .then((respuesta) => {
                if (respuesta.id_tienda != 0) {
                    res.status(200).json({
                        mensaje: "Tienda Creada",
                        nuevoCodigo: respuesta.id_tienda,
                    });
                } else {
                    res.status(400).json({
                        respuesta: "Tienda no creada, puede estar repetida",
                    });
                }
            })
            .catch((mierror) => {
                console.log("Error ", mierror);
                res.status(400).json({
                    respuesta: "Tienda no creada",
                });
            });
    }
}
export default crearTiendaDAO;

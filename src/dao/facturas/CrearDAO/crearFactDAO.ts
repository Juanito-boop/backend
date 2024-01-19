import { Response } from "express";
import pool from "../../../config/connection/conexion";

class crearFactDAO {
    protected static async crear(
        sqlCrear: string,
        params: any,
        res: Response
    ): Promise<any> {
        await pool
        .task(async (consulta) => {
            // Asegúrate de que tu consulta SQL retorne el ID de la factura creada
            const result = await consulta.one(sqlCrear, params);
            return result;
        })
        .then((respuesta) => {
            // Incluye el ID de la factura en la respuesta
            res.status(200).json({
                // Respuesta: "Factura creada",
                FacturaId: respuesta.id_factura, // Asegúrate de que 'id' es el nombre correcto del campo
            });
        })
        .catch((error) => {
            console.log(`Error ${error}`);
            res.status(400).json({
                Respuesta: "No se puede crear la factura",
            });
        });
    }
}
export default crearFactDAO;

import { Response } from "express";
import pool from "../../../config/connection/conexion";

class crearRolDAO {
    protected static async crearRol(
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
                    return { id_rol: 0 };
                }
            })
            .then((respuesta) => {
                if (respuesta.id_rol != 0) {
                    res.status(200).json({
                        mensaje: "Rol Creado",
                        nuevoCodigo: respuesta.id_rol,
                    });
                } else {
                    res.status(400).json({
                        respuesta: "Rol no creado, puede estar repetido el rol",
                    });
                }
            })
            .catch((mierror) => {
                console.log("Error ", mierror);
                res.status(400).json({
                    respuesta: "Rol no creado",
                });
            });
    }
}
export default crearRolDAO;

import { Response } from "express";
import pool from "../../../config/connection/conexion";

class crearUsuarioDAO {
    protected static async crearUsuario(
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
                    return { id_usuario: 0 };
                }
            })
            .then((respuesta) => {
                if (respuesta.id_usuario != 0) {
                    res.status(200).json({
                        mensaje: "Usuario Creado",
                        nuevoCodigo: respuesta.id_usuario,
                    });
                } else {
                    res.status(400).json({
                        respuesta:
                            "Usuario no creado, puede estar repetido el usuario",
                    });
                }
            })
            .catch((mierror) => {
                console.log("Error ", mierror);
                res.status(400).json({
                    respuesta: "Usuario no creado",
                });
            });
    }
}
export default crearUsuarioDAO;

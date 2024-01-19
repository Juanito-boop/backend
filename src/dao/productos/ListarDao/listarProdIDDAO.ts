import { Response } from "express";
import pool from "../../../config/connection/conexion";
class ListarPorIdDAO {
    protected static async listarPorId(
        sql_listID: string,
        idecita: any,
        res: Response
    ): Promise<any> {
        try {
            const respuesta = await pool.multi(sql_listID, idecita);
            console.log("=>" + respuesta);

            const productos = respuesta.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);

            return res.status(200).json(productos);
        } catch (mierror) {
            console.log("=>", mierror);
            return res.status(400).json({
                respuesta: "Error, no hay información asociada a ese ID",
                idecita: idecita,
            });
        }
    }
}

export default ListarPorIdDAO;
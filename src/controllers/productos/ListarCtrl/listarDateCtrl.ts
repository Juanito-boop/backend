import { Request, Response } from "express";

import listarDate from "../../../dao/productos/ListarDao/listarDateDAO";
import { SQL_PRODUCTOS } from "../../../respository/productos/productosCRUD";

class listarDateCtrl extends listarDate {
    public listarDate(req: Request, res: Response) {
        const sql_listarDate = SQL_PRODUCTOS.DATE_SQL;
        const { fecha1, fecha2 } = req.body;
        const datos = [fecha1, fecha2];
        listarDateCtrl.listarDate(sql_listarDate, datos, res);
    }
}

const ListarDateCtrl = new listarDateCtrl();
export default ListarDateCtrl;

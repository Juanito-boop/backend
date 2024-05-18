import { Request, Response } from "express";

import listarVar from "../../../dao/productos/ListarDao/listarVarDAO";
import { SQL_PRODUCTOS } from "../../../repository/productos/productosCRUD";

class listarVariCtrl extends listarVar {
    public listarVar(req: Request, res: Response) {
        const sql_listar = SQL_PRODUCTOS.VARIEDAD;
        listarVariCtrl.listar(sql_listar, [], res);
    }
}

const listarVarieCtrl = new listarVariCtrl();
export default listarVarieCtrl;

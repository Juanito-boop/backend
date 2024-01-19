import { Request, Response } from "express";

import listarTotal from "../../../dao/facturas/ListarDao/listarTotalDAO";
import { SQL_FACTURAS } from "./../../../respository/facturas/facturasCRUD";

class listarTotalF extends listarTotal {
    public listarT(req: Request, res: Response) {
        const sql_listar = SQL_FACTURAS.TOTAL;
        listarTotalF.listarTotal(sql_listar, [], res);
    }
}

const crtlListarT = new listarTotalF();
export default crtlListarT;

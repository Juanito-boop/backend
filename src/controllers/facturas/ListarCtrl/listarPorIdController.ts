import { Request, Response } from "express";

import ListarPorIdDAO from "../../../dao/facturas/ListarDao/listarPorIdDAO";
import { SQL_FACTURAS } from "../../../respository/facturas/facturasCRUD";

class listaridCtrl extends ListarPorIdDAO {
    public listarID(req: Request, res: Response): void {
        const idecita = req.params.idecita;
        const sqlListarId = SQL_FACTURAS.LISTARPORID;
        listaridCtrl.listarPorId(sqlListarId, idecita, res);
    }
}

const crtlCrearEstu = new listaridCtrl();
export default crtlCrearEstu; 

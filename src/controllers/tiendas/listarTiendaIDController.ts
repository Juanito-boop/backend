import { Request, Response } from "express";

import ListarPorIdDAO from "../../dao/tiendas/ListarDao/listarTiendaIdDAO";
import { SQL_TIENDA } from "../../respository/tiendas/tiendaRepoCRUD";

class listaridCtrl extends ListarPorIdDAO {
    public listarID(req: Request, res: Response): void {
        const idecita = req.params.idecita;
        const sqlListarId = SQL_TIENDA.LISTARPORID;
        listaridCtrl.listarPorId(sqlListarId, idecita, res);
    }
}

const crtlCrearEstu = new listaridCtrl();
export default crtlCrearEstu; 

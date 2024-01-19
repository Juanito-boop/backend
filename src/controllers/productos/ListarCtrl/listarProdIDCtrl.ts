import { Request, Response } from "express";

import ListarPorIdDAO from "../../../dao/productos/ListarDao/listarProdIDDAO";
import {  SQL_PRODUCTOS  } from "../../../respository/productos/productosCRUD";

class listaridCtrl extends ListarPorIdDAO {
    public listarID(req: Request, res: Response): void {
        const idecita = req.params.idecita;
        const sqlListarId = SQL_PRODUCTOS.LISTARPORID;
        listaridCtrl.listarPorId(sqlListarId, idecita, res);
    }
}

const listarID = new listaridCtrl();
export default listarID;
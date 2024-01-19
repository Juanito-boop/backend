import { Request, Response } from "express";

import ListarPorIdDAO from "../../../dao/categorias/ListarDao/listarID";
import { SQL_CATEGORIAS } from "../../../respository/categorias/categoriasCRUD";

class listaridCtrl extends ListarPorIdDAO {
    public listarID(req: Request, res: Response): void {
        const idecita = req.params.idecita;
        const sqlListarId = SQL_CATEGORIAS.LISTARID;
        listaridCtrl.listarPorId(sqlListarId, idecita, res);
    }
}

const listarID = new listaridCtrl();
export default listarID;
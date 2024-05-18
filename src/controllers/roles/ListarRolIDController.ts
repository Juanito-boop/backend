import { Request, Response } from "express";

import ListarPorIdDAO from "../../dao/roles/ListarDao/ListarRolIDDAO";
import { SQL_ROL } from "../../repository/roles/rolRepoCRUD";

class listaridCtrl extends ListarPorIdDAO {
    public listarID(req: Request, res: Response): void {
        const idecita = req.params.idecita;
        const sqlListarId = SQL_ROL.LISTARPORID;
        listaridCtrl.listarPorId(sqlListarId, idecita, res);
    }
}

const crtlCrearEstu = new listaridCtrl();
export default crtlCrearEstu; 
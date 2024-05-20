import { Request, Response } from "express";

import ListarPorIdDAO from "../../dao/usuarios/ListarDao/listarUSIDDAO";
import { SQL_USUARIO } from "../../repository/usuarios/usuarioRepoCRUD";

class listaridCtrl extends ListarPorIdDAO {
    // public listarID(req: Request, res: Response): void {
    //     const idecita = req.params.idecita;
    //     const sqlListarId = SQL_USUARIO.LISTARPORID;
    //     listaridCtrl.listarPorId(sqlListarId, idecita, res);
    // }
}

const crtlCrearEstu = new listaridCtrl();
export default crtlCrearEstu; 

import { Request, Response } from "express";

import comprobarDAO from "../../dao/usuarios/ListarDao/ListarTiendaInfoDAO";
import { SQL_USUARIO } from "../../repository/usuarios/usuarioRepoCRUD";

class comprobarCtrl extends comprobarDAO {
    public listarInfo(req: Request, res: Response): void {
        const idecita = req.params.idecita;
        const sqlListarId = SQL_USUARIO.TIENDAINFO;
        comprobarCtrl.listarPorId(sqlListarId, idecita, res);
    }
}

const crtlCrearEstu = new comprobarCtrl();
export default crtlCrearEstu;

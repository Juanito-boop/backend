import { Request, Response } from "express";

import comprobarDAO from "../../../dao/categorias/ListarDao/comprobacionSTDAO";
import { SQL_CATEGORIAS } from "../../../respository/categorias/categoriasCRUD";

class comprobarCtrl extends comprobarDAO {
    public listarPorStock(req: Request, res: Response): void {
        const stock = req.params.stock;
        const sqlListarId = SQL_CATEGORIAS.COMPROBACION;
        comprobarCtrl.listarPorId(sqlListarId, stock, res);
    }
}

const crtlCrearEstu = new comprobarCtrl();
export default crtlCrearEstu;

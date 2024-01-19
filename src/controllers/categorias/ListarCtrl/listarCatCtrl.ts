import { Request, Response } from "express";

import listarCatDAO from "../../../dao/categorias/ListarDao/listarCatDAO";
import { SQL_CATEGORIAS } from "../../../respository/categorias/categoriasCRUD";

class listarCategorias extends listarCatDAO {
    public listarTodos(req: Request, res: Response) {
        const sql_listar = SQL_CATEGORIAS.LISTAR;
        listarCategorias.listar(sql_listar, [], res);
    }
}

const crtlCrearEstu = new listarCategorias();
export default crtlCrearEstu;

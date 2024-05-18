import { Request, Response } from "express";

import listar from "../../../dao/productos/ListarDao/listarProdDAO";
import { SQL_PRODUCTOS } from "../../../repository/productos/productosCRUD";

class listarProductos extends listar {
    public listarTodos(req: Request, res: Response) {
        const sql_listar = SQL_PRODUCTOS.LISTAR;
        listarProductos.listar(sql_listar, [], res);
    }
}

const crtlCrearEstu = new listarProductos();
export default crtlCrearEstu;

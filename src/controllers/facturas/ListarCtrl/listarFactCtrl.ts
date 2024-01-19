import { Request, Response } from "express";

import listar from "../../../dao/facturas/ListarDao/listarCatDAO";
import { SQL_FACTURAS } from "./../../../respository/facturas/facturasCRUD";

class listarFacturas extends listar {
    public listarTodos(req: Request, res: Response) {
        const sql_listar = SQL_FACTURAS.LISTAR;
        listarFacturas.listar(sql_listar, [], res);
    }
}

const crtlCrearEstu = new listarFacturas();
export default crtlCrearEstu;

import { Request, Response } from "express";

import ListarTiendaDAO from "../../dao/tiendas/ListarDao/ListarTiendaDAO";
import { SQL_TIENDA } from "../../respository/tiendas/tiendaRepoCRUD";

class listarTiendaControlador extends ListarTiendaDAO {
    public listarTodosTienda(req: Request, res: Response): void {
        const sql_tienda_listarTodos = SQL_TIENDA.LISTAR_TODOS;
        listarTiendaControlador.listarTodosTienda(
            sql_tienda_listarTodos,
            [],
            res
        );
    }
}

const ctrlListarEstu = new listarTiendaControlador();
export default ctrlListarEstu;

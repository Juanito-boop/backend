import { Request, Response } from "express";

import ListarTiendaDAO from "../../dao/tiendas/ListarDao/ListarEmpleadosDAO";
import { SQL_TIENDA } from "../../respository/tiendas/tiendaRepoCRUD";

class listarEmpleadosControlador extends ListarTiendaDAO {
    public listarEmpTienda(req: Request, res: Response): void {
        const sql_tienda_listarTodos = SQL_TIENDA.EMPLEADOS;
        listarEmpleadosControlador.listarEmpleadosTienda(
            sql_tienda_listarTodos,
            [],
            res
        );
    }
}

const ctrlListarEmp = new listarEmpleadosControlador();
export default ctrlListarEmp;

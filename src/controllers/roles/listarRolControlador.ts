import { Request, Response } from "express";

import ListarRolDAO from "../../dao/roles/ListarDao/ListarRolDAO";
import { SQL_ROL } from "../../respository/roles/rolRepoCRUD";

class listarRolControlador extends ListarRolDAO {
    public listarTodosRol(req: Request, res: Response): void {
        const sql_rol_listarTodos = SQL_ROL.LISTAR_TODOS;
        listarRolControlador.listarTodosRoles(sql_rol_listarTodos, [], res);
    }
}

const ctrlListarRol = new listarRolControlador();
export default ctrlListarRol;

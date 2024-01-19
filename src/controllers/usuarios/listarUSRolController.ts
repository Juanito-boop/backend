import { Request, Response } from "express";

import ListarUSRol from "../../dao/usuarios/ListarDao/ListarUSRolDAO";
import { SQL_USUARIO } from "../../respository/usuarios/usuarioRepoCRUD";

class listarUSRolControlador extends ListarUSRol {
    public listarUSRol(req: Request, res: Response): void {
        const sql_usu_listarUSRol = SQL_USUARIO.CONTAR;
        listarUSRolControlador.listarUSRol(sql_usu_listarUSRol, [], res);
    }
}

const ctrlListarUSRol = new listarUSRolControlador();
export default ctrlListarUSRol;

import { Request, Response } from "express";

import ListarUsuarioDAO from "../../dao/usuarios/ListarDao/ListarUsuarioDAO";
import { SQL_USUARIO } from "../../repository/usuarios/usuarioRepoCRUD";

class listarUsuarioControlador extends ListarUsuarioDAO {
    public listarTodosUsuario(req: Request, res: Response): void {
        const sql_usu_listarTodos = SQL_USUARIO.LISTAR_TODOS;
        listarUsuarioControlador.listarTodosUsuarios(
            sql_usu_listarTodos,
            [],
            res
        );
    }
}

const ctrlListarUsuario = new listarUsuarioControlador();
export default ctrlListarUsuario;


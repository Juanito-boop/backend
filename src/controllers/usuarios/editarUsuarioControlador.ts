import { Request, Response } from "express";

import editarUsuarioDAO from "../../dao/usuarios/ActualizarDao/editarUsuarioDAO";
import { SQL_USUARIO } from "../../repository/usuarios/usuarioRepoCRUD";

class editarUsuarioControlador extends editarUsuarioDAO {
    public editarUsuario(req: Request, res: Response): void {
        const { username, password, id_tienda, id_rol, id_usuario } = req.body;
        /*
        req.body =>{ "nombre": "User", "apellido":"Test","edad": "15"} 
        */
        const datos = [username, password, id_tienda, id_rol, id_usuario];
        editarUsuarioControlador.editarUsuario(SQL_USUARIO.EDITAR, datos, res);
    }
}

const ctrlEditarUsuario = new editarUsuarioControlador();
export default ctrlEditarUsuario;

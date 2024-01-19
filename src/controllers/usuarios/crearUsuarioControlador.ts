import { Request, Response } from "express";

import crearUsuarioDAO from "../../dao/usuarios/CrearDao/crearUsuarioDAO";
import { SQL_USUARIO } from "../../respository/usuarios/usuarioRepoCRUD";

class crearUsuarioControlador extends crearUsuarioDAO {
    public postUsuario(req: Request, res: Response): void {
        const { username, password, id_tienda, id_rol } = req.body;
        /*
        req.body =>{ "nombre": "User", "apellido":"Test","edad": "15"} 
        */

        const datos = [username, password, id_tienda, id_rol];
        console.log(">>>" + datos);
        crearUsuarioControlador.crearUsuario(
            SQL_USUARIO.VERIFICAR,
            SQL_USUARIO.CREAR,
            datos,
            res
        );
    }
}
const ctrlCrearUsuario = new crearUsuarioControlador();
export default ctrlCrearUsuario;

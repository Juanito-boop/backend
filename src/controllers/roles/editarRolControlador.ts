import { Request, Response } from "express";

import editarRolDAO from "../../dao/roles/ActualizarDao/editarRolDAO";
import { SQL_ROL } from "../../repository/roles/rolRepoCRUD";

class editarRolControlador extends editarRolDAO {
    public editarRol(req: Request, res: Response): void {
        const { nombre_rol, id_rol } = req.body;
        /*
        req.body =>{ "nombre": "User", "apellido":"Test","edad": "15"} 
        */
        const datos = [nombre_rol, id_rol];
        editarRolControlador.editarRol(SQL_ROL.EDITAR, datos, res);
    }
}

const ctrlEditarRol = new editarRolControlador();
export default ctrlEditarRol;

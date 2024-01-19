import { Request, Response } from "express";

import crearRolDAO from "../../dao/roles/CrearDao/crearRolDAO";
import { SQL_ROL } from "../../respository/roles/rolRepoCRUD";

class crearRolControlador extends crearRolDAO {
    public postRol(req: Request, res: Response): void {
        const { nombre_rol } = req.body;
        /*
        req.body =>{ "nombre": "User", "apellido":"Test","edad": "15"} 
        */

        const datos = [nombre_rol];
        console.log(">>>" + datos);
        crearRolControlador.crearRol(
            SQL_ROL.VERIFICAR,
            SQL_ROL.CREAR,
            datos,
            res
        );
    }
}
const ctrlCrearRol = new crearRolControlador();
export default ctrlCrearRol;

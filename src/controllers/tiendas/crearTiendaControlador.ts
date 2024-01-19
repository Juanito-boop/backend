import { Request, Response } from "express";

import crearTiendaDAO from "../../dao/tiendas/CrearDao/crearTiendaDAO";
import { SQL_TIENDA } from "../../respository/tiendas/tiendaRepoCRUD";

class crearTiendaControlador extends crearTiendaDAO {
    public postTienda(req: Request, res: Response): void {
        const {
            nombre_tienda,
            direccion_tienda,
            telefono_tienda,
            propietario_tienda,
        } = req.body;
        /*
        req.body =>{ "nombre": "User", "apellido":"Test","edad": "15"} 
        */

        const datos = [
            nombre_tienda,
            direccion_tienda,
            telefono_tienda,
            propietario_tienda,
        ];
        console.log(">>>" + datos);
        crearTiendaControlador.crearTienda(
            SQL_TIENDA.VERIFICAR,
            SQL_TIENDA.CREAR,
            datos,
            res
        );
    }
}
const ctrlCrearTienda = new crearTiendaControlador();
export default ctrlCrearTienda;

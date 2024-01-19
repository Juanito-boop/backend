import { Request, Response } from "express";

import editarTiendaDAO from "../../dao/tiendas/ActualizarDao/editarTiendaDAO";
import { SQL_TIENDA } from "../../respository/tiendas/tiendaRepoCRUD";

class eliminarTiendaControlador extends editarTiendaDAO {
    public editarTienda(req: Request, res: Response): void {
        const {
            nombre_tienda,
            direccion_tienda,
            telefono_tienda,
            propietario_tienda,
            id_tienda,
        } = req.body;
        /*
        req.body =>{ "nombre": "User", "apellido":"Test","edad": "15"} 
        */
        const datos = [
            nombre_tienda,
            direccion_tienda,
            telefono_tienda,
            propietario_tienda,
            id_tienda,
        ];
        eliminarTiendaControlador.editarTienda(SQL_TIENDA.EDITAR, datos, res);
    }
}

const ctrlEditarTienda = new eliminarTiendaControlador();
export default ctrlEditarTienda;

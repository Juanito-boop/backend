import { Request, Response } from "express";

import eliminarTiendaDAO from "../../dao/tiendas/EliminarDao/eliminarTiendaDAO";
import { SQL_TIENDA } from "../../respository/tiendas/tiendaRepoCRUD";

class eliminarTiendaControlador extends eliminarTiendaDAO {
    public borrarTienda(req: Request, res: Response): void {
        const codigo = req.params.idecita;
        const parametro = [codigo];
        eliminarTiendaControlador.borraraPorIdTienda(
            SQL_TIENDA.ELIMINAR,
            parametro,
            res
        );
    }
}

const ctrlEliminarTienda = new eliminarTiendaControlador();
export default ctrlEliminarTienda;

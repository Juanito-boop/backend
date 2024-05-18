import { Request, Response } from "express";

import eliminar from "../../../dao/productos/EliminarDao/eliminarProdDAO";
import { SQL_PRODUCTOS } from "../../../repository/productos/productosCRUD";

class eliminarProducto extends eliminar {
    public borrar(req: Request, res: Response): void {
        const codigo = req.params.id;
        const parametro = [codigo];
        eliminarProducto.borrar(SQL_PRODUCTOS.ELIMINAR, parametro, res);
    }
}

const ctrlEliminarEstu = new eliminarProducto();
export default ctrlEliminarEstu;

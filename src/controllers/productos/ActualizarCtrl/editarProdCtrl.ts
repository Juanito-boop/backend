import { Request, Response } from "express";

import editar from "../../../dao/productos/ActualizarDao/editarProdDAO";
import { SQL_PRODUCTOS } from "../../../repository/productos/productosCRUD";

class editarProducto extends editar {
    public editar(req: Request, res: Response): void {
        const {
            nombre,
            marca,
            precio_unitario,
            fecha_caducidad,
            descripcion,
            stock,
            id_categoria,
            id_producto,
        } = req.body;
        const datos = [
            nombre,
            marca,
            precio_unitario,
            fecha_caducidad,
            descripcion,
            stock,
            id_categoria,
            id_producto,
        ];

        editarProducto.editar(SQL_PRODUCTOS.ACTUALIZAR, datos, res);
    }
}

const ctrlEditarEstu = new editarProducto();
export default ctrlEditarEstu;

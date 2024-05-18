import { Request, Response } from "express";

import crear from "../../../dao/productos/CrearDAO/crearProdDAO";
import { SQL_PRODUCTOS } from "../../../repository/productos/productosCRUD";

class crearProducto extends crear {
    public crear(req: Request, res: Response): void {
        const { nombre,marca,precio_unitario,fecha_caducidad,descripcion,stock,id_categoria,id_tienda } = req.body;
        const datos = [ nombre, marca, precio_unitario, fecha_caducidad, descripcion, stock, id_categoria, id_tienda ];
        crearProducto.crear( SQL_PRODUCTOS.VERIFICAR, SQL_PRODUCTOS.CREAR, datos, res );
    }
}

const crtlCrearEstu = new crearProducto();
export default crtlCrearEstu;

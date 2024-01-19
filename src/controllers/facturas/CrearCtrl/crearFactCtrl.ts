import { Request, Response } from "express";

import crear from "../../../dao/facturas/CrearDAO/crearFactDAO";
import { SQL_FACTURAS } from "./../../../respository/facturas/facturasCRUD";

class crearFactura extends crear {
    public crear(req: Request, res: Response): void {
        const { fecha_venta, vendedor_factura, cantidad_producto, id_tienda } =
            req.body;
        const datos = [
            fecha_venta,
            vendedor_factura,
            cantidad_producto,
            id_tienda,
        ];

        crearFactura.crear(SQL_FACTURAS.CREAR, datos, res);
    }
}

const crtlCrearEstu = new crearFactura();
export default crtlCrearEstu;

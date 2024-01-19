import { Request, Response } from "express";

import editar from "../../../dao/facturas/ActualizarDao/editarFactDAO";
import { SQL_FACTURAS } from "./../../../respository/facturas/facturasCRUD";

class editarfactura extends editar {
    public editar(req: Request, res: Response): void {
        const {
            fecha_venta,
            vendedor_factura,
            cantidad_producto,
            id_tienda,
            id_factura,
        } = req.body;
        const datos = [
            fecha_venta,
            vendedor_factura,
            cantidad_producto,
            id_tienda,
            id_factura,
        ];

        editarfactura.editar(SQL_FACTURAS.ACTUALIZAR, datos, res);
    }
}

const ctrlEditarEstu = new editarfactura();
export default ctrlEditarEstu;

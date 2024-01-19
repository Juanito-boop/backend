import { Request, Response } from "express";

import eliminar from "../../../dao/facturas/EliminarDao/eliminarFactDAO";
import { SQL_FACTURAS } from "./../../../respository/facturas/facturasCRUD";

class eliminarFactura extends eliminar {
    public borrar(req: Request, res: Response): void {
        const codigo = req.params.id;
        const parametro = [codigo];
        eliminarFactura.borrar(SQL_FACTURAS.ELIMINAR, parametro, res);
    }
}

const ctrlEliminarEstu = new eliminarFactura();
export default ctrlEliminarEstu;

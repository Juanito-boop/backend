import { Request, Response } from "express";

import CrearProductosDAO from "../../../dao/detalles/CrearDao/CrearDAO";
import { SQL_DETALLES } from "../../../repository/detalles/detallesCRUD";

class CrearProductosFacturasDetalles extends CrearProductosDAO {
  public crear(req: Request, res: Response) {
    const sql_crear = SQL_DETALLES.CREAR;
    const detalles = req.body;
    CrearProductosFacturasDetalles.crearProductos(sql_crear, detalles, res);
  }
}

const crtlCrear = new CrearProductosFacturasDetalles();
export default crtlCrear;
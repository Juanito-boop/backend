import { Request, Response } from "express";

import listarTotal from "../../../dao/detalles/ListarDao/listarTotalDAO";
import { SQL_DETALLES } from "../../../respository/detalles/detallesCRUD";

class listarTotalF extends listarTotal {
  public listarT(req: Request, res: Response) {
      const sql_listar = SQL_DETALLES.LISTAR;
      const tienda = req.params.tienda;
      listarTotalF.listarTotal(sql_listar, tienda, res);
  }
}

const crtlListarT = new listarTotalF();
export default crtlListarT;
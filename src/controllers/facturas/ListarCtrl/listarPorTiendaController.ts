import { Request, Response } from "express";
import ListarPorTiendaDAO from "../../../dao/facturas/ListarDao/listarPorTiendaDAO";
import { SQL_FACTURAS } from "../../../respository/facturas/facturasCRUD";

class listarTiendaCtrl extends ListarPorTiendaDAO {
  public listarTienda(req: Request, res: Response): void {
    const tienda = req.params.tienda;
    const idecita = req.params.idecita;
    const sqlListarTienda = SQL_FACTURAS.LISTARPORTIENDA;
    listarTiendaCtrl.listarPorTienda(sqlListarTienda, tienda, idecita, res);
  }
}

const crtlCrearEstu = new listarTiendaCtrl();
export default crtlCrearEstu;
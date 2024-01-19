import { Request, Response } from "express";

import listarFechaDAO from "../../../dao/facturas/ListarDao/listarFechaDAO";
import { SQL_INVOICE_FILTER } from "../../../respository/facturas/facturasRepo";

class listarFechaFacturas extends listarFechaDAO {
  public listarPorFecha(req: Request, res: Response) {
    const sql_listar = SQL_INVOICE_FILTER.DATE;
    const date = req.body.fecha_venta;
    listarFechaFacturas.listByDate(sql_listar, date, res);
  }

  public listarPorAnio(req: Request, res: Response) {
    const sql_listar = SQL_INVOICE_FILTER.YEAR;
    const year = req.body.year;
    const tienda = req.body.tienda;
    listarFechaFacturas.listByYear(sql_listar, year, tienda, res);
  }

  public listarPorMes(req: Request, res: Response) {
    const sql_listar = SQL_INVOICE_FILTER.MONTH;
    const month = req.body.month;
    const tienda = req.body.tienda;
    listarFechaFacturas.listByMonth(sql_listar, month, tienda, res);
  }

  public listarPorDia(req: Request, res: Response) {
    const sql_listar = SQL_INVOICE_FILTER.DAY;
    const day = req.body.day;
    const tienda = req.body.tienda;
    listarFechaFacturas.listByDay(sql_listar, day, tienda, res);
  }
}

const crtlFechaListar = new listarFechaFacturas();
export default crtlFechaListar;

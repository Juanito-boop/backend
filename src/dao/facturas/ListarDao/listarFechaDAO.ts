import { Response } from "express";
import pool from "../../../config/connection/conexion";
class listarFechaDAO {
  //============================================================
  // LIstar facturas por fecha completa en formato YYYY-MM-DD
  //============================================================
  protected static async listByDate(
    sql_listar: string,
    fecha: string,
    res: Response
  ): Promise<any> {
    await pool
      .result(sql_listar, fecha)
      .then((objFacturas) => {
       
        return res.status(200).json( objFacturas.rows);
      })
      .catch((error) => {
        console.log("Hubo un error: ", error);
        res.status(400).json({
          Mensaje: "Error listando facturas por la fecha",
        });
      });
  }
  //============================================================
  // LIstar facturas por año YYYY
  //============================================================

  protected static async listByYear(
    sql_listar: string,
    year: string,
    tienda: string,
    res: Response
  ): Promise<any> {
    await pool
      .result(sql_listar, [year, tienda])
      .then((objFacturas) => {
        return res.status(200).json(objFacturas.rows);
      })
      .catch((error) => {
        console.log("Hubo un error: ", error);
        res.status(400).json({
          Mensaje: "Error listando facturas por el año",
        });
      });
  }
  //============================================================
  // LIstar facturas por mes MM
  //============================================================

  protected static async listByMonth(
    sql_listar: string,
    mes: string,
    tienda: string,
    res: Response
  ): Promise<any> {
    await pool
      .result(sql_listar, [mes, tienda])
      .then((objFacturas) => {
      
        return res.status(200).json(objFacturas.rows);
      })
      .catch((error) => {
        console.log("Hubo un error: ", error);
        res.status(400).json({
          Mensaje: "Error listando facturas por el mes",
        });
      });
  }
  //============================================================
  // LIstar facturas por dia DD
  //============================================================

  protected static async listByDay(
    sql_listar: string,
    day: string,
    tienda: string,
    res: Response
  ): Promise<any> {
    await pool
      .result(sql_listar, [day, tienda])
      .then((objFacturas) => {
       
        return res.status(200).json(objFacturas.rows);
      })
      .catch((error) => {
        console.log("Hubo un error: ", error);
        res.status(400).json({
          Mensaje: "Error listando facturas por el dia",
        });
      });
  }
}

export default listarFechaDAO;

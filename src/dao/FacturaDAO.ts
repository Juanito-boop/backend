import { Response } from 'express';
import pool from '../config/connection/conexion';
import { contador, Exists, Factura, FacturaCreationResult } from "../interface/interfaces";
import { SQL_FACTURAS } from '../repository/crudSQL';

export default class FacturaDAO {
  public static async insertInvoice(data: Factura[], res: Response){
    const existingInvoice: Exists | null = await pool.oneOrNone(SQL_FACTURAS.isInvoiceDuplicate, data);

    if (existingInvoice?.exists) {
      res.status(400).json({ Respuesta: "La factura ya existe" });
      return;
    }

    try {
      const result: FacturaCreationResult = await pool.task(async (consulta) => {
        return await consulta.one<FacturaCreationResult>(SQL_FACTURAS.createInvoice, data);
      });

      res.status(200).json({ id_factura: result.id_factura });
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede crear la factura, ${error}` });
    }
  }

  public static async fetchStoreInvoices(tienda: number, res: Response) {
    try {
      const respuesta: Factura[] = await pool.manyOrNone(SQL_FACTURAS.getInvoicesByStoreId, tienda);
      res.status(200).json(respuesta);
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede listar las facturas de la tienda, ${error}` });
      return[]
    }
  }

  public static async filterInvoiceIdByStore(tienda: number, id: number, res: Response){
    try {
      const respuesta: Factura | null = await pool.oneOrNone<Factura>(SQL_FACTURAS.getInvoiceByStoreAndId, [tienda, id]);
      res.status(200).json(respuesta);
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede listar la factura de la tienda, ${error}` });
      return null;
    }
  }

  public static async updateInvoice(fieldsToUpdate: { [key: string]: any }, idFactura: number, tienda: number, res: Response){
    if (Object.keys(fieldsToUpdate).length === 0) {
      res.status(400).json({ Respuesta: "No se proporcionaron campos para actualizar" });
    }

    const existingInvoice = await pool.oneOrNone(SQL_FACTURAS.checkInvoiceExists, [tienda, idFactura]);
    
    if (!existingInvoice) {
      res.status(404).json({ Respuesta: "Factura no encontrada" });
      return;
    }

    try {
      const setClause = Object.keys(fieldsToUpdate)
        .map((field, index) => `${field} = $${index + 1}`)
        .join(", ");

      const values = Object.values(fieldsToUpdate);
      values.push(idFactura, tienda);
      
      const sqlUpdate = `UPDATE facturas SET ${setClause} WHERE id_factura = $${values.length - 1} AND id_tienda = $${values.length}`;
      
      const result = await pool.result(sqlUpdate, values);
      
      if (result.rowCount > 0) {
        res.status(200).json({ Respuesta: "Factura actualizada" });
      } else {
        res.status(404).json({ Respuesta: "Factura no encontrada" });
      }
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede actualizar la factura, ${error}` });
    }
  }

  public static async deleteInvoice(tienda:number, idFactura: number, res: Response){
    const existingInvoice = await pool.oneOrNone(SQL_FACTURAS.checkInvoiceExists, [tienda, idFactura]);
    
    if (!existingInvoice) {
      res.status(404).json({ Respuesta: "Factura no encontrada" });
      return;
    }
    
    try {  
      const result = await pool.result(SQL_FACTURAS.deleteInvoice, [tienda, idFactura]);
      
      if (result.rowCount > 0) {
        res.status(200).json({ Respuesta: "Factura eliminada correctamente" });
      } else {
        res.status(404).json({ Respuesta: "Factura no encontrada" });
      }
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede eliminar la factura, ${error}` });
    }
  }

  public static async countInvoicesTypeByStore(tienda: number, tipo: contador, res: Response){
    const queriesByType: Record<contador, string> = {
      "anual": SQL_FACTURAS.storeAnnualInvoiceCounter,
      "mensual": SQL_FACTURAS.storeMonthlyInvoiceCounter,
      "diaria": SQL_FACTURAS.storeDailyInvoiceCounter,
    };

    const counterSQLQuery = queriesByType[tipo];

    if (!counterSQLQuery) {
      res.status(400).json({ Mensaje: `Tipo de contador '${tipo.toUpperCase()}' no válido.` });
    }
    
    try {
      const result = await pool.result(counterSQLQuery, [tienda]);
      if (result.rowCount > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ Mensaje: `No se encontraron facturas para la tienda ${tienda}` });
      }
    } catch (error) {
      res.status(400).json({
        Mensaje: `Error listando cantidad de facturas ${tipo.toUpperCase()}`,
        Error: (error as Error).message
      });
    }
  }
}
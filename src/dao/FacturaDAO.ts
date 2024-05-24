import pool from '../config/connection/conexion';
import { contador, Exists, Factura, FacturaCreationResult } from "../interface/interfaces";
import { SQL_FACTURAS } from '../repository/crudSQL';
import Result from '../utils/Result';

export default class FacturaDAO {
  public static async insertInvoice(data: Factura[]): Promise<Result<{ id_factura: number }>> {
    const existingInvoice: Exists | null = await pool.oneOrNone(SQL_FACTURAS.isInvoiceDuplicate, data);

    if (existingInvoice?.exists) {
      return Result.fail("La factura ya existe");
    }

    try {
      const result: FacturaCreationResult = await pool.task(async (consulta) => {
        return await consulta.one<FacturaCreationResult>(SQL_FACTURAS.createInvoice, data);
      });

      return Result.succes({ id_factura: result.id_factura });
    } catch (error) {
      return Result.fail(`No se puede crear la factura, ${error}`);
    }
  }

  public static async fetchStoreInvoices(tienda: number): Promise<Result<Factura[]>> {
    try {
      const respuesta: Factura[] = await pool.manyOrNone(SQL_FACTURAS.getInvoicesByStoreId, tienda);
      return Result.succes(respuesta);
    } catch (error) {
      return Result.fail(`No se puede listar las facturas de la tienda, ${error}`);
    }
  }

  public static async filterInvoiceIdByStore(tienda: number, id: number): Promise<Result<Factura | null>> {
    try {
      const respuesta: Factura | null = await pool.oneOrNone<Factura>(SQL_FACTURAS.getInvoiceByStoreAndId, [tienda, id]);
      return Result.succes(respuesta);
    } catch (error) {
      return Result.fail(`No se puede listar la factura de la tienda, ${error}`);
    }
  }

  public static async updateInvoice(fieldsToUpdate: { [key: string]: any }, idFactura: number, tienda: number): Promise<Result<string>> {
    if (Object.keys(fieldsToUpdate).length === 0) {
      return Result.fail("No se proporcionaron campos para actualizar");
    }

    const existingInvoice = await pool.oneOrNone(SQL_FACTURAS.checkInvoiceExists, [tienda, idFactura]);

    if (!existingInvoice) {
      return Result.fail("Factura no encontrada");
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
        return Result.succes("Factura actualizada");
      } else {
        return Result.fail("Factura no encontrada");
      }
    } catch (error) {
      return Result.fail(`No se puede actualizar la factura, ${error}`);
    }
  }

  public static async deleteInvoice(tienda: number, idFactura: number): Promise<Result<string>> {
    const existingInvoice = await pool.oneOrNone(SQL_FACTURAS.checkInvoiceExists, [tienda, idFactura]);

    if (!existingInvoice) {
      return Result.fail("Factura no encontrada");
    }

    try {
      const result = await pool.result(SQL_FACTURAS.deleteInvoice, [tienda, idFactura]);

      if (result.rowCount > 0) {
        return Result.succes("Factura eliminada correctamente");
      } else {
        return Result.fail("Factura no encontrada");
      }
    } catch (error) {
      return Result.fail(`No se puede eliminar la factura, ${error}`);
    }
  }

  public static async countInvoicesTypeByStore(tienda: number, tipo: contador) {
    const queriesByType: Record<contador, string> = {
      "anual": SQL_FACTURAS.storeAnnualInvoiceCounter,
      "mensual": SQL_FACTURAS.storeMonthlyInvoiceCounter,
      "diaria": SQL_FACTURAS.storeDailyInvoiceCounter,
    };

    const counterSQLQuery = queriesByType[tipo];

    if (!counterSQLQuery) {
      return Result.fail(`Tipo de contador '${tipo.toUpperCase()}' no válido.`);
    }

    try {
      const result = await pool.result(counterSQLQuery, [tienda]);
      if (result.rowCount > 0) {
        return Result.succes(result.rows[0]);
      } else {
        return Result.fail(`No se encontraron facturas para la tienda ${tienda}`);
      }
    } catch (error) {
      return Result.fail(`Error listando cantidad de facturas ${tipo.toUpperCase()}: ${(error as Error).message}`);
    }
  }
}

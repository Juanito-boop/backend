import pool from "../config/connection/conexion";
import { Empleados, Exists, Tienda, TiendaCreationResult } from "../interface/interfaces";
import { SQL_TIENDAS } from "../repository/crudSQL";
import Result from "../utils/Result";

export default class tiendaDAO {
  public static async addNewStore(data: Tienda[]): Promise<Result<TiendaCreationResult>> {
    try {
      const existingStore: Exists | null = await pool.oneOrNone(SQL_TIENDAS.isStoreDuplicate, data);

      if (existingStore?.exists) {
        return Result.fail("La tienda ya existe");
      }

      const result: TiendaCreationResult = await pool.task(async (consulta) => {
        return await consulta.one(SQL_TIENDAS.createStore, data);
      });

      return Result.succes({ id_tienda: result.id_tienda });
    } catch (error) {
      return Result.fail(`No se puede crear la tienda, ${error}`);
    }
  }

  public static async fetchStores(): Promise<Result<Tienda[]>> {
    try {
      const respuesta: Tienda[] = await pool.manyOrNone(SQL_TIENDAS.getStores);
      return Result.succes(respuesta);
    } catch (error) {
      return Result.fail(`No se puede listar las tiendas, ${error}`);
    }
  }

  public static async filterStoreById(idStore: number): Promise<Result<Tienda | null>> {
    try {
      const respuesta: Tienda | null = await pool.oneOrNone<Tienda>(SQL_TIENDAS.getStoreById, idStore);
      return Result.succes(respuesta);
    } catch (error) {
      return Result.fail(`No se puede listar la tienda, ${error}`);
    }
  }

  public static async fetchEmployeeCounterStores(limit: number, offset: number) {
    try {
      const totalRecords = await pool.one(SQL_TIENDAS.countTotalRecords);
      const respuesta: Empleados[] = await pool.manyOrNone(SQL_TIENDAS.employeeCounter, [limit, offset]);
      let nextOffset = offset + limit;
      const moreRecordsAvailable = nextOffset < totalRecords;
      if (respuesta.length > 0 || moreRecordsAvailable) {
        return Result.succes(respuesta);
      } else {
        return Result.fail("No hay más registros disponibles.");
      }
    } catch (error) {
      return Result.fail(`No se puede listar las tiendas, ${error}`);
    }
  }

  public static async updateStore(fieldsToUpdate: { [key: string]: any }, idStore: number): Promise<Result<void>> {
    if (Object.keys(fieldsToUpdate).length === 0) {
      return Result.fail("No se proporcionaron campos para actualizar");
    }

    const existingStore = await pool.oneOrNone(SQL_TIENDAS.checkStoreExists, idStore);

    if (!existingStore) {
      return Result.fail("Tienda no encontrada");
    }

    try {
      const setClause = Object.keys(fieldsToUpdate)
        .map((field, index) => `${field} = $${index + 1}`)
        .join(", ");

      await pool.query(`UPDATE tiendas SET ${setClause} WHERE id_tienda = $${Object.keys(fieldsToUpdate).length + 1}`, [...Object.values(fieldsToUpdate), idStore]);
      return Result.succes();
    } catch (error) {
      return Result.fail(`Error actualizando la tienda, ${error}`);
    }
  }

  public static async deleteStore(idStore: number): Promise<Result<void>> {
    const existingStore = await pool.oneOrNone(SQL_TIENDAS.checkStoreExists, idStore);

    if (!existingStore) {
      return Result.fail("Tienda no encontrada");
    }

    try {
      await pool.query(SQL_TIENDAS.deleteStore, idStore);
      return Result.succes();
    } catch (error) {
      return Result.fail(`Error eliminando la tienda, ${error}`);
    }
  }
}

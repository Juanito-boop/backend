import { Response } from "express";
import pool from "../config/connection/conexion";
import { Empleados, Exists, Tienda, TiendaCreationResult } from "../interface/interfaces";
import { SQL_TIENDAS } from "../repository/crudSQL";

export default class tiendaDAO{
  public static async addNewStore(data: Tienda[], res: Response) {
    const existingStore: Exists | null = await pool.oneOrNone(SQL_TIENDAS.isStoreDuplicate, data);

    if (existingStore?.exists) {
      res.status(400).json({ Respuesta: "La tienda ya existe" });
      return;
    }

    try {
      const result: TiendaCreationResult = await pool.task(async (consulta) => {
        return await consulta.one(SQL_TIENDAS.createStore, data);
      });

      res.status(200).json({ id_tienda: result.id_tienda});
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede crear la tienda, ${error}` });
    }
  }

  public static async fetchStores(res: Response) {
    try {
      const respuesta: Tienda[] = await pool.manyOrNone(SQL_TIENDAS.getStores);
      res.status(200).json(respuesta);
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede listar las tiendas, ${error}` });
    }
  }

  public static async filterStoreById(idStore: number, res: Response) {
    try {
      const respuesta: Tienda | null = await pool.oneOrNone<Tienda>(SQL_TIENDAS.getStoreById, idStore);
      res.status(200).json(respuesta);
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede listar la tienda, ${error}` });
      return null;
    }
  }

  public static async fetchEmployeeCounterStores(res: Response) {
    try {
      const respuesta: Empleados[] = await pool.manyOrNone(SQL_TIENDAS.employeeCounter);
      res.status(200).json(respuesta);
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede listar las tiendas, ${error}` });
    }
  }

  public static async updateStore(fieldsToUpdate: { [key: string]: any }, idStore: number, res: Response) {
    if (Object.keys(fieldsToUpdate).length === 0) {
      res.status(400).json({ Respuesta: "No se proporcionaron campos para actualizar" });
    }

    const existingStore = await pool.oneOrNone(SQL_TIENDAS.checkStoreExists, idStore);
    
    if (!existingStore) {
      res.status(404).json({ Respuesta: "Tienda no encontrada" });
      return;
    }

    try {
      const setClause = Object.keys(fieldsToUpdate)
        .map((field, index) => `${field} = $${index + 1}`)
        .join(", ");

      await pool.query(`UPDATE tiendas SET ${setClause} WHERE id_tienda = $${Object.keys(fieldsToUpdate).length + 1}`, [...Object.values(fieldsToUpdate), idStore]);
      res.status(200).json({ Respuesta: "Tienda actualizada" });
    } catch (error) {
      res.status(500).json({ Respuesta: "Error actualizando la tienda", error });
    }
  }

  public static async deleteStore(idStore: number, res: Response) {
    const existingStore = await pool.oneOrNone(SQL_TIENDAS.checkStoreExists, idStore);
    
    if (!existingStore) {
      res.status(404).json({ Respuesta: "Tienda no encontrada" });
      return;
    }

    try {
      await pool.query(SQL_TIENDAS.deleteStore, idStore);
      res.status(200).json({ Respuesta: "Tienda eliminada" });
    } catch (error) {
      res.status(500).json({ Respuesta: "Error eliminando la tienda", error });
    }
  }
}
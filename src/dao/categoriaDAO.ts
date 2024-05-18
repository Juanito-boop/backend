import { Response } from "express";
import pool from "../config/connection/conexion";
import { Categoria, CategoriaCreationResult, Exists } from "../interface/interfaces";
import { SQL_CATEGORIAS } from "../repository/crudSQL";

export default class CategoriaDAO {
  public static async insertCategory(data: Categoria[], res: Response){
    const existingCategory: Exists | null = await pool.oneOrNone(SQL_CATEGORIAS.isCategoryDuplicate, data);

    if (existingCategory?.exists) {
      res.status(400).json({ Respuesta: "La categoria ya existe" });
      return;
    }

    try {
      const result: CategoriaCreationResult = await pool.task(async (consulta) => {
        return await consulta.one<CategoriaCreationResult>(SQL_CATEGORIAS.createCategory, data);
      });

      res.status(200).json({ id_categoria: result.id_categoria });
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede crear la categoria, ${error}` });
    }
  }

  public static async fetchCategories(tienda: number, res: Response) {
    try {
      const respuesta: Categoria[] = await pool.manyOrNone(SQL_CATEGORIAS.getCategoriesByStoreId, tienda);
      res.status(200).json(respuesta);
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede listar las categorias de la tienda, ${error}` });
    }
  }

  public static async filterCategoryIdByStore(tienda: number, idCategoria: number, res: Response) {
    try {
      const respuesta: Categoria | null = await pool.oneOrNone<Categoria>(SQL_CATEGORIAS.getCategoriesByStoreAndId, [tienda, idCategoria]);
      res.status(200).json(respuesta);
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede listar la categoria de la tienda, ${error}` });
      return null;
    }
  }

  public static async updateCategory(fieldsToUpdate: { [key: string]: any },tienda: number,  idCategoria: number, res: Response) {
    if (Object.keys(fieldsToUpdate).length === 0) {
      res.status(400).json({ Respuesta: "No se proporcionaron campos para actualizar" });
    }
    
    const existingCategory = await pool.oneOrNone(SQL_CATEGORIAS.checkCategoryExists, [tienda, idCategoria]);
    
    if (!existingCategory) {
      res.status(404).json({ Respuesta: "Categoria no encontrada" });
      return;
    }
    
    try {
      const setClause = Object.keys(fieldsToUpdate)
        .map((field, index) => `${field} = $${index + 1}`)
        .join(", ");

      const values = Object.values(fieldsToUpdate);
      values.push(idCategoria, tienda);
      
      const sqlUpdate = `UPDATE categorias SET ${setClause} WHERE id_categoria = $${values.length - 1} AND id_tienda = $${values.length}`;
      
      const result = await pool.result(sqlUpdate, values);
      
      if (result.rowCount > 0) {
        res.status(200).json({ Respuesta: "Categoria actualizada" });
      } else {
        res.status(404).json({ Respuesta: "Categoria no encontrada" });
      }
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede actualizar la categoria, ${error}` });
    }
  }

  public static async deleteCategory(tienda:number, idCategoria: number, res: Response) {
    const existingCategory = await pool.oneOrNone(SQL_CATEGORIAS.checkCategoryExists, [tienda, idCategoria]);

    if (!existingCategory) {
      res.status(404).json({ Respuesta: "Categoria no encontrada" });
      return;
    }

    try {
      const result = await pool.result(SQL_CATEGORIAS.deleteCategory, idCategoria);

      if (result.rowCount > 0) {
        res.status(200).json({ Respuesta: "Categoria eliminada" });
      } else {
        res.status(404).json({ Respuesta: "Categoria no encontrada" });
      }
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede eliminar la categoria, ${error}` });
    }
  }
}
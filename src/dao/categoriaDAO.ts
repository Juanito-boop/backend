import pool from "../config/connection/conexion";
import { Categoria, CategoriaCreationResult, Exists } from "../interface/interfaces";
import { SQL_CATEGORIAS } from "../repository/crudSQL";
import Result from '../utils/Result';

export default class CategoriaDAO {
  public static async insertCategory(data: Categoria[]): Promise<Result<CategoriaCreationResult>> {
    const existingCategory: Exists | null = await pool.oneOrNone(SQL_CATEGORIAS.isCategoryDuplicate, [
      data[0].nombre,
      data[0].descripcion,
      data[0].id_tienda
    ]);

    if (existingCategory?.exists) {
      return Result.fail("La categoria ya existe");
    }

    try {
      const result: CategoriaCreationResult = await pool.task(async (consulta) => {
        return await consulta.one<CategoriaCreationResult>(SQL_CATEGORIAS.createCategory, data);
      });

      return Result.success({ id_categoria: result.id_categoria });
    } catch (error) {
      return Result.fail(`No se puede crear la categoria, ${error}`);
    }
  }

  public static async fetchCategories(tienda: number) {
    try {
      const respuesta: Categoria[] = await pool.manyOrNone(SQL_CATEGORIAS.getCategoriesByStoreId, tienda);
      return Result.success(respuesta);
    } catch (error) {
      return Result.fail(`No se puede listar las categorias de la tienda, ${error}`);
    }
  }

  public static async filterCategoryIdByStore(tienda: number, idCategoria: number) {
    try {
      const respuesta: Categoria | null = await pool.oneOrNone<Categoria>(SQL_CATEGORIAS.getCategoriesByStoreAndId, [tienda, idCategoria]);
      return Result.success(respuesta);
    } catch (error) {
      return Result.fail(`No se puede listar la categoria de la tienda, ${error}`);
    }
  }

  public static async updateCategory(fieldsToUpdate: { [key: string]: any },tienda: number,  idCategoria: number) {
    if (Object.keys(fieldsToUpdate).length === 0) {
      return Result.fail("No se proporcionaron campos para actualizar");
    }

    const existingCategory = await pool.oneOrNone(SQL_CATEGORIAS.checkCategoryExists, [tienda, idCategoria]);

    if (!existingCategory) {
      return Result.fail("Categoria no encontrada");
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
        return Result.success("Categoria actualizada");
      } else {
        return Result.fail("Categoria no encontrada");
      }
    } catch (error) {
      return Result.fail(`No se puede actualizar la categoria, ${error}`);
    }
  }

  public static async deleteCategory(tienda:number, idCategoria: number) {
    const existingCategory = await pool.oneOrNone(SQL_CATEGORIAS.checkCategoryExists, [tienda, idCategoria]);

    if (!existingCategory) {
      return Result.fail("Categoria no encontrada");
    }

    try {
      const result = await pool.result(SQL_CATEGORIAS.deleteCategory, idCategoria);

      if (result.rowCount > 0) {
        return Result.success("Categoria eliminada");
      } else {
        return Result.fail("Categoria no encontrada");
      }
    } catch (error) {
      return Result.fail(`No se puede eliminar la categoria, ${error}`);
    }
  }
}
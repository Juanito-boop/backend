import { Response } from 'express';
import pool from '../config/connection/conexion';
import { Producto, ProductoCreationResult } from '../interface/interfaces';
import { SQL_PRODUCTOS } from '../repository/crudSQL';

export default class productoDAO {
  public static async insertProduct(data: Producto[], res: Response) {
    const existingProduct = await pool.oneOrNone(SQL_PRODUCTOS.isProductDuplicate, data);

    if (existingProduct?.cantidad > 0) {
      res.status(400).json({ Respuesta: "El producto ya existe" });
      return;
    }

    try {
      const result: ProductoCreationResult = await pool.task(async (consulta) => {
        return await consulta.one<ProductoCreationResult>(SQL_PRODUCTOS.CREAR, data);
      });

      res.status(200).json({ id_producto: result.id_producto });
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede crear el producto, ${error}` });
    }
  }

  public static async fetchProducts(tienda: number, res: Response) {
    try {
      const respuesta: Producto[] = await pool.manyOrNone(SQL_PRODUCTOS.getProductsByStoreId, tienda);
      res.status(200).json(respuesta);
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede listar los productos, ${error}` });
      return [];
    }
  }

  public static async filterProductById(tienda: number, idProducto: number, res: Response) {
    try {
      const respuesta: Producto | null = await pool.oneOrNone<Producto>(SQL_PRODUCTOS.LISTARPORID, [tienda, idProducto]);
      res.status(200).json(respuesta);
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede listar el producto, ${error}` });
      return null;
    }
  }

  public static async updateProduct(fieldsToUpdate: { [key: string]: any }, idProducto: number, tienda: number, res: Response) {
    if (Object.keys(fieldsToUpdate).length === 0) {
      res.status(400).json({ Respuesta: "No se proporcionaron campos para actualizar" });
    }

    const existingProduct = await pool.oneOrNone(SQL_PRODUCTOS.checkProductExists, [tienda, idProducto]);

    if (!existingProduct) {
      res.status(404).json({ Respuesta: "Producto no encontrado" });
      return;
    }
    
    try {
      const setClause = Object.keys(fieldsToUpdate)
        .map((field, index) => `${field} = $${index + 1}`)
        .join(", ");

      const values = Object.values(fieldsToUpdate);
      values.push(tienda, idProducto);

      await pool.query(SQL_PRODUCTOS.ACTUALIZAR + setClause, values);
      res.status(200).json({ Respuesta: "Producto actualizado" });
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede actualizar el producto, ${error}` });
    }
  }

  public static async deleteProduct(tienda: number, idProducto: number, res: Response) {
    const existingProduct = await pool.oneOrNone(SQL_PRODUCTOS.checkProductExists, [tienda, idProducto]);

    if (!existingProduct) {
      res.status(404).json({ Respuesta: "Producto no encontrado" });
      return;
    }

    try {
      await pool.query(SQL_PRODUCTOS.ELIMINAR, idProducto);
      res.status(200).json({ Respuesta: "Producto eliminado" });
    } catch (error) {
      res.status(400).json({ Respuesta: `No se puede eliminar el producto, ${error}` });
    }
  }
}
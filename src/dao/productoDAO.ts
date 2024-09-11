import pool from '../config/connection/conexion';
import { Producto, ProductoCreationResult } from '../interface/interfaces';
import { SQL_PRODUCTOS } from '../repository/crudSQL';
import Result from '../utils/Result';

export default class productoDAO {
	public static async insertProduct(data: Producto[]): Promise<Result<ProductoCreationResult>> {
		try {
			const existingProduct = await pool.oneOrNone(SQL_PRODUCTOS.isProductDuplicate, data);

			if (existingProduct?.cantidad > 0) {
				return Result.fail("El producto ya existe");
			}

			const result: ProductoCreationResult = await pool.task(async (consulta) => {
				return await consulta.one<ProductoCreationResult>(SQL_PRODUCTOS.CREAR, data);
			});

			return Result.success({ id_producto: result.id_producto });
		} catch (error) {
			return Result.fail(`No se puede crear el producto, ${error}`);
		}
	}

	public static async fetchProducts(tienda: number): Promise<Result<Producto[]>> {
		try {
			const respuesta: Producto[] = await pool.manyOrNone(SQL_PRODUCTOS.getProductsByStoreId, tienda);
			return Result.success(respuesta);
		} catch (error) {
			return Result.fail(`No se puede listar los productos, ${error}`);
		}
	}

	public static async productsCounter(tienda: number): Promise<Result<number>> {
		try {
			const respuesta: number = await pool.one<number>(SQL_PRODUCTOS.countProducts, tienda);
			return Result.success(respuesta);
		} catch (error) {
			return Result.fail(`No se puede contar los productos, ${error}`);
		}
	}

	public static async filterProductById(tienda: number, idProducto: number): Promise<Result<Producto | null>> {
		try {
			const respuesta: Producto | null = await pool.oneOrNone<Producto>(SQL_PRODUCTOS.LISTARPORID, [tienda, idProducto]);
			return Result.success(respuesta);
		} catch (error) {
			return Result.fail(`No se puede listar el producto, ${error}`);
		}
	}

	public static async updateProduct(fieldsToUpdate: { [key: string]: any }, idProducto: number, tienda: number): Promise<Result<void>> {
		if (Object.keys(fieldsToUpdate).length === 0) {
			return Result.fail("No se proporcionaron campos para actualizar");
		}

		const existingProduct = await pool.oneOrNone(SQL_PRODUCTOS.checkProductExists, [tienda, idProducto]);

		if (!existingProduct) {
			return Result.fail("Producto no encontrado");
		}
		
		try {
			const setClause = Object.keys(fieldsToUpdate)
				.map((field, index) => `${field} = $${index + 1}`)
				.join(", ");

			const values = Object.values(fieldsToUpdate);
			values.push(tienda, idProducto);

			await pool.query(SQL_PRODUCTOS.ACTUALIZAR + setClause, values);
			return Result.success();
		} catch (error) {
			return Result.fail(`No se puede actualizar el producto, ${error}`);
		}
	}

	public static async deleteProduct(tienda: number, idProducto: number): Promise<Result<void>> {
		const existingProduct = await pool.oneOrNone(SQL_PRODUCTOS.checkProductExists, [tienda, idProducto]);

		if (!existingProduct) {
			return Result.fail("Producto no encontrado");
		}

		try {
			await pool.query(SQL_PRODUCTOS.ELIMINAR, idProducto);
			return Result.success();
		} catch (error) {
			return Result.fail(`No se puede eliminar el producto, ${error}`);
		}
	}
}
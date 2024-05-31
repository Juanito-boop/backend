import pool from "../config/connection/conexion";
import { DetalleFactura, Factura, FacturaCreationResult } from "../interface/interfaces";
import { SQL_DETALLES, SQL_FACTURAS, SQL_PRODUCTOS } from "../repository/crudSQL";
import Result from "../utils/Result";

export default class DetalleFacturaDAO {
	public static async insertInvoiceWithDetails(factura: Omit<Factura, 'id_factura'>, detalles: Omit<DetalleFactura, 'id_factura'>[]): Promise<Result<FacturaCreationResult>> {
		try {
			const result = await pool.task(async (consulta) => {
				// Inserta la factura
				const facturaValues: Omit<Factura, 'id_factura'> = {
					fecha_venta: factura.fecha_venta, 
					vendedor_factura: factura.vendedor_factura, 
					cantidad_producto: factura.cantidad_producto, 
					id_tienda: factura.id_tienda
				};
				const facturaResult: FacturaCreationResult | null = await consulta.oneOrNone<FacturaCreationResult>(SQL_FACTURAS.createInvoice, [facturaValues.fecha_venta, facturaValues.vendedor_factura, facturaValues.cantidad_producto, facturaValues.id_tienda]);

				// Obtiene el id_factura generado
				const id_factura = facturaResult?.id_factura;
				console.log(`Factura creada con id: ${id_factura}`);

				// Verifica que todos los productos existen antes de insertar los detalles
				for (const detalle of detalles) {
					const detalleValues = {
						cantidad_producto: detalle.cantidad_producto, 
						fecha_creacion: detalle.fecha_creacion, 
						id_factura, 
						id_producto: detalle.id_producto
					};
					const productExists = await consulta.oneOrNone(SQL_PRODUCTOS.checkProductExists, [
						detalleValues.id_producto
					]);
					if (!productExists) {
						throw new Error(`Producto con id ${detalle.id_producto} no existe.`);
					}
				}

				// Inserta los detalles de la factura
				for (const detalle of detalles) {
					const detalleValues: Omit<DetalleFactura, 'id_detalle_factura'> = {
						cantidad_producto: detalle.cantidad_producto, 
						fecha_creacion: detalle.fecha_creacion, 
						id_factura, 
						id_producto: detalle.id_producto
					};
					await consulta.oneOrNone(SQL_DETALLES.insertNewDetail, [
						detalleValues.cantidad_producto, 
						detalleValues.fecha_creacion, 
						detalleValues.id_factura, 
						detalleValues.id_producto
					]);
				}

				return { id_factura };
			});

			return Result.success({ id_factura: result.id_factura as number });
		} catch (error) {
			console.error(`Error al insertar detalles: ${(error as Error).message}`);
			return Result.fail(`No se puede crear la factura con detalles, error: ${(error as Error).message}`);
		}
	}
	// return Result.fail(`No se puede crear la factura con detalles, error: ${(error as Error).message}`);

	public static async fetchStoreInvoices(id_tienda: number): Promise<Result<DetalleFactura[]>> {
		try {
			const result = await pool.many<DetalleFactura>(SQL_DETALLES.getInvoiceDetailsByStoreAndID, id_tienda);
			return Result.success(result);
		} catch (error) {
			return Result.fail(`No se pueden obtener las facturas de la tienda, ${error}`);
		}
	}
}
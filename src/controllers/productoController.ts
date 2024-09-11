import { Request, Response } from 'express';
import { Producto } from '../interface/interfaces';
import productoDAO from '../dao/productoDAO';

class ProductoController {
	public static async createProduct(req: Request, res: Response): Promise<void> {
		const { nombre, marca, precio_unitario, fecha_caducidad, descripcion, stock, id_categoria, id_tienda } = req.body;
		const data: Producto[] = [ 
			nombre, 
			marca, 
			precio_unitario, 
			fecha_caducidad, 
			descripcion, 
			stock, 
			id_categoria, 
			id_tienda 
		];
		const result = await productoDAO.insertProduct(data);

		if (result.isSuccess) {
			res.status(200).json(result.getValue());
		} else {
			res.status(400).json({ Respuesta: result.errorValue() });
		}
	}

	public static async productsCounter(req: Request, res: Response): Promise<void> {
		const tienda: number = parseInt(req.params.idTienda);

		if (isNaN(tienda)) {
			res.status(400).json({ Respuesta: "El id de la tienda debe ser un número" });
			return;
		}

		const result = await productoDAO.productsCounter(tienda);

		if (result.isSuccess) {
			res.status(200).json(result.getValue());
		} else {
			res.status(400).json({ Respuesta: result.errorValue() });
		}
	}

	public static async fetchProducts(req: Request, res: Response): Promise<void> {
		const tienda: number = parseInt(req.params.idTienda);

		if (isNaN(tienda)) {
			res.status(400).json({ Respuesta: "El id de la tienda debe ser un número" });
			return;
		}

		const result = await productoDAO.fetchProducts(tienda);

		if (result.isSuccess) {
			res.status(200).json(result.getValue());
		} else {
			res.status(400).json({ Respuesta: result.errorValue() });
		}
	}

	public static async filterProductById(req: Request, res: Response): Promise<void> {
		const tienda: number = parseInt(req.params.idTienda);
		const idProducto: number = parseInt(req.params.idProducto);

		if (isNaN(tienda) || isNaN(idProducto)) {
			res.status(400).json({ Respuesta: "El id de la tienda y del producto deben ser números" });
			return;
		}

		const result = await productoDAO.filterProductById(tienda, idProducto);

		if (result.isSuccess) {
			res.status(200).json(result.getValue());
		} else {
			res.status(400).json({ Respuesta: result.errorValue() });
		}
	}

	public static async updateProduct(req: Request, res: Response): Promise<void> {
		const tienda: number = parseInt(req.params.idTienda);
		const idProducto: number = parseInt(req.params.idProducto);
		const fieldsToUpdate: Producto = req.body;

		if (isNaN(tienda) || isNaN(idProducto)) {
			res.status(400).json({ Respuesta: "El id de la tienda y del producto deben ser números" });
			return;
		}

		const result = await productoDAO.updateProduct(fieldsToUpdate, idProducto, tienda);

		if (result.isSuccess) {
			res.status(200).json({ Respuesta: "Producto actualizado" });
		} else {
			res.status(400).json({ Respuesta: result.errorValue() });
		}
	}

	public static async deleteProduct(req: Request, res: Response): Promise<void> {
		const tienda: number = parseInt(req.params.idTienda);
		const idProducto: number = parseInt(req.params.idProducto);

		if (isNaN(tienda) || isNaN(idProducto)) {
			res.status(400).json({ Respuesta: "El id de la tienda y del producto deben ser números" });
			return;
		}

		const result = await productoDAO.deleteProduct(tienda, idProducto);

		if (result.isSuccess) {
			res.status(200).json({ Respuesta: "Producto eliminado" });
		} else {
			res.status(400).json({ Respuesta: result.errorValue() });
		}
	}
}

export default ProductoController;
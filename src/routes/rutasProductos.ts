import { Router } from "express";

import ProductoController from "../controllers/productoController";
import cacheMiddleware from "../middleware/Cache";

class RutasProductos {
	public rutasApi: Router;
	constructor() {
		this.rutasApi = Router();
		this.config();
	}
	public config() {
		this.rutas();
	}
	public rutas() {
		// /api/v1/public/productos
		this.rutasApi.post("/", ProductoController.createProduct);
		this.rutasApi.get(
			"/:idTienda",
			 cacheMiddleware(),
			ProductoController.fetchProducts
		);
		this.rutasApi.get(
			"/:idTienda/counter",
				cacheMiddleware(),
			ProductoController.productsCounter
		);
		this.rutasApi.get(
			"/:idTienda/:idProducto",
			 cacheMiddleware(),
			ProductoController.filterProductById
		);
		this.rutasApi.patch("/:idTienda/:idProducto",ProductoController.updateProduct);
		this.rutasApi.delete("/:idTienda/:idProducto", ProductoController.deleteProduct);
	}
}
const misRutas = new RutasProductos();
export default misRutas.rutasApi;

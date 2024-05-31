import { Router } from "express";

import tiendaController from "../controllers/tiendaController";
import cacheMiddleware from "../middleware/Cache";

class Rutas {
	public rutasApi: Router;

	constructor() {
		this.rutasApi = Router();
		//cargar el inico de la config de rutas
		this.config();
	}

	public config() {
		this.rutas();
	}

	public rutas() {
		// /api/v1/public/tiendas
		this.rutasApi.post("/", tiendaController.insertStore);
		this.rutasApi.get(
			"/",
			 cacheMiddleware(),
			tiendaController.fetchStores
		);
		this.rutasApi.get(
			"/empleados",
			 cacheMiddleware(),
			tiendaController.fetchEmployeeCounterStores
		);
		this.rutasApi.get(
			"/:idTienda",
			 cacheMiddleware(),
			tiendaController.filterStoreById
		);
		this.rutasApi.patch("/:idTienda", tiendaController.patchStore);
		this.rutasApi.delete("/:idTienda", tiendaController.deleteStore);
	}
}

const misRutas = new Rutas();
export default misRutas.rutasApi;

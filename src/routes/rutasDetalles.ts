import { Router } from "express";

import detallesFacturaController from "../controllers/detallesFacturaController";
import cacheMiddleware from "../middleware/Cache";

class RutasDetalles {
	public rutasApi: Router;

	constructor() {
		this.rutasApi = Router();
		this.config();
	}

	public config() {
		this.rutas();
	}

	public rutas() {
		// /api/v1/public/detalles
		this.rutasApi.post("/", detallesFacturaController.insertInvoiceWithDetails);
		this.rutasApi.get(
			"/:idTienda",
			 cacheMiddleware(),
			detallesFacturaController.getStoreInvoices
		);
	}
}

const misRutas = new RutasDetalles();
export default misRutas.rutasApi;
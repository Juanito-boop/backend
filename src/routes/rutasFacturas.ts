import { Router } from "express";

import controladorFacturas from "../controllers/FacturaController";
import cacheMiddleware from "../middleware/Cache";

class RutasFacturas {
	public rutasApi: Router;

	constructor() {
		this.rutasApi = Router();
		this.config();
	}

	public config() {
		this.rutas();
	}

	public rutas() {
		// /api/v1/public/facturas
		this.rutasApi.get(
			"/:idTienda",
			cacheMiddleware(60),
			controladorFacturas.getStoreInvoices
			);
		this.rutasApi.get(
			"/:idTienda/annual",
			 cacheMiddleware(60),
			controladorFacturas.getStoreAnnualInvoices
		);
		this.rutasApi.get(
			"/:idTienda/monthly",
			 cacheMiddleware(60),
			controladorFacturas.getStoreMonthlyInvoices
		);
		this.rutasApi.get(
			"/:idTienda/daily",
			 cacheMiddleware(60),
			controladorFacturas.getStoreDailyInvoices
		);
		this.rutasApi.get(
			"/:idTienda/:idFactura",
			 cacheMiddleware(60),
			controladorFacturas.getFilteredInvoicesByStoreAndId
		);
		this.rutasApi.patch("/:idTienda/:idFactura", controladorFacturas.patchStoreInvoice);
		this.rutasApi.delete("/:idTienda/:idFactura", controladorFacturas.deleteStoreInvoiceId);
	}
}
const misRutas = new RutasFacturas();
export default misRutas.rutasApi;

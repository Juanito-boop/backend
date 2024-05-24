import { Router } from "express";

import controladorFacturas from "../controllers/FacturaController"; 

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
        // /api/public/facturas
        this.rutasApi.post("/", controladorFacturas.insertInvoice);
        this.rutasApi.get("/:idTienda", controladorFacturas.getStoreInvoices);
        this.rutasApi.get("/:idTienda/annual", controladorFacturas.getStoreAnnualInvoices);
        this.rutasApi.get("/:idTienda/monthly", controladorFacturas.getStoreMonthlyInvoices);
        this.rutasApi.get("/:idTienda/daily", controladorFacturas.getStoreDailyInvoices);
        this.rutasApi.get("/:idTienda/:idFactura", controladorFacturas.getFilteredInvoicesByStoreAndId);
        this.rutasApi.patch("/:idTienda/:idFactura", controladorFacturas.patchStoreInvoice);
        this.rutasApi.delete("/:idTienda/:idFactura", controladorFacturas.deleteStoreInvoiceId);
    }
}
const misRutas = new RutasFacturas();
export default misRutas.rutasApi;
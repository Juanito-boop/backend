import { Router } from "express";

import controladorFacturas from "../controllers/FacturaController"

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
        this.rutasApi.get("/:tienda", controladorFacturas.getStoreInvoices);
        this.rutasApi.get("/:tienda/:idFactura", controladorFacturas.getFilteredInvoicesByStoreAndId);
        this.rutasApi.get("/:tienda/annual", controladorFacturas.getStoreAnnualInvoices);
        this.rutasApi.get("/:tienda/monthly", controladorFacturas.getStoreMonthlyInvoices);
        this.rutasApi.get("/:tienda/daily", controladorFacturas.getStoreDailyInvoices);
        this.rutasApi.post("/", controladorFacturas.insertInvoice);
        this.rutasApi.patch("/:tienda/:idFactura", controladorFacturas.patchStoreInvoice);
        this.rutasApi.delete("/:tienda/:idFactura", controladorFacturas.deleteStoreInvoiceId);
    }
}
const misRutas = new RutasFacturas();
export default misRutas.rutasApi;
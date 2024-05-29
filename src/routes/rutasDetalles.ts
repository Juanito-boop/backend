import { Router } from "express";

import detallesFacturaController from "../controllers/detallesFacturaController";

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
    this.rutasApi.post("/", detallesFacturaController.insertInvoiceWithDetails);
    this.rutasApi.get("/:idTienda", detallesFacturaController.getStoreInvoices);
  }
}

const misRutas = new RutasDetalles();
export default misRutas.rutasApi;
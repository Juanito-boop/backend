import { Router } from "express";

import listar from "../controllers/detalles/ListarCtrl/listarTotalController";
import crear from "../controllers/detalles/CrearCtrl/CrearController";

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
        this.rutasApi.get("/listarDetalles", listar.listarT);
        this.rutasApi.post("/crear", crear.crear);
    }
}

const misRutas = new RutasDetalles();
export default misRutas.rutasApi;
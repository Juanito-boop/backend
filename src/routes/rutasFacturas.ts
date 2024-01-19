import { Router } from "express";

import actualizar from "../controllers/facturas/ActualizarCtrl/editarFactCtrl";
import crear from "../controllers/facturas/CrearCtrl/crearFactCtrl";
import eliminar from "../controllers/facturas/EliminarCtrl/eliminarFactCtrl";
import listar from "../controllers/facturas/ListarCtrl/listarFactCtrl";
import listatT from "../controllers/facturas/ListarCtrl/listarTotalCtrl";
import listarID from "../controllers/facturas/ListarCtrl/listarPorIdController";
import listarPorTienda from "../controllers/facturas/ListarCtrl/listarPorTiendaController";

import crtlFechaListar from "../controllers/facturas/ListarCtrl/listarFechaCtrl";

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
        this.rutasApi.get("/listar", listar.listarTodos);
        this.rutasApi.post("/crear", crear.crear);
        this.rutasApi.put("/editar", actualizar.editar);
        this.rutasApi.delete("/eliminar/:id", eliminar.borrar);
        this.rutasApi.get("/listarT", listatT.listarT);
        this.rutasApi.get("/listarPorId/:idecita", listarID.listarID);
        this.rutasApi.get("/listarPorTienda/:tienda", listarPorTienda.listarTienda);

        ///////////////////////////////////////
        this.rutasApi.get("/listarFecha", crtlFechaListar.listarPorFecha);
        this.rutasApi.get("/listarA", crtlFechaListar.listarPorAnio);
        this.rutasApi.get("/listarMes", crtlFechaListar.listarPorMes);
        this.rutasApi.get("/listarDia", crtlFechaListar.listarPorDia);
    }
}
const misRutas = new RutasFacturas();
export default misRutas.rutasApi;

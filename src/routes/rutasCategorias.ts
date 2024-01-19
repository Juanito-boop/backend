import { Router } from "express";

import actualizar from "../controllers/categorias/ActualizarCtrl/editarCatCtrl";
import crear from "../controllers/categorias/CrearCtrl/crearCatCtrl";
import eliminar from "../controllers/categorias/EliminarCtrl/eliminarCatCtrl";
import listar from "../controllers/categorias/ListarCtrl/listarCatCtrl";
import comprobar from "../controllers/categorias/ListarCtrl/comprobarStCtrl";
import listarIDECITA from "../controllers/categorias/ListarCtrl/listarporidController";

class RutasCategorias {
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
        this.rutasApi.get("/stock/:stock", comprobar.listarPorStock);
        this.rutasApi.get("/listarPorId/:idecita", listarIDECITA.listarID);
    }
}
const misRutas = new RutasCategorias();
export default misRutas.rutasApi;

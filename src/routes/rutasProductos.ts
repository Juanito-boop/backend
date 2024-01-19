import { Router } from "express";

import actualizar from "../controllers/productos/ActualizarCtrl/editarProdCtrl";
import crear from "../controllers/productos/CrearCtrl/crearProdCtrl";
import eliminar from "../controllers/productos/EliminarCtrl/eliminarProdCtrl";
import listar from "../controllers/productos/ListarCtrl/listarProdCtrl";
import listarVAR from "../controllers/productos/ListarCtrl/listarVarCtrl";
import listarDATE from "../controllers/productos/ListarCtrl/listarDateCtrl";
import listarProdID from "../controllers/productos/ListarCtrl/listarProdIDCtrl";

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
        this.rutasApi.get("/listar", listar.listarTodos);
        this.rutasApi.post("/crear", crear.crear);
        this.rutasApi.put("/editar", actualizar.editar);
        this.rutasApi.delete("/eliminar/:id", eliminar.borrar);
        this.rutasApi.get("/listarVar", listarVAR.listarVar);
        this.rutasApi.get("/listarDate", listarDATE.listarDate);
        this.rutasApi.get("/listarPorId/:idecita", listarProdID.listarID);
    }
}
const misRutas = new RutasProductos();
export default misRutas.rutasApi;

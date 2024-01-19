import { Router } from "express";
import ControladorTiendaCrear from "../controllers/tiendas/crearTiendaControlador";
import ControladorTiendaEditar from "../controllers/tiendas/editarTiendaControlador";
import ControladorTiendaEliminar from "../controllers/tiendas/eliminarTiendaControlador";
import ControladorTiendaListar from "../controllers/tiendas/listarTiendaControlador";
import ControladorListarEmp from "../controllers/tiendas/listarEmpleadosControler";
import ListarId from "../controllers/tiendas/listarTiendaIDController";

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
        //cargar los controladorespara el manejo de la info
        // no pasa nada si la ruta es diferente y lo unico igual debe ser el idecita
        this.rutasApi.get(
            "/listarTiendas",
            ControladorTiendaListar.listarTodosTienda
        );
        this.rutasApi.post("/crearTienda", ControladorTiendaCrear.postTienda);
        this.rutasApi.put(
            "/editarTienda",
            ControladorTiendaEditar.editarTienda
        );
        this.rutasApi.delete(
            "/eliminar/:idecita",
            ControladorTiendaEliminar.borrarTienda
        );
        this.rutasApi.get(
            "/listarEmpleados",
            ControladorListarEmp.listarEmpTienda
        );
        this.rutasApi.get("/listarPorId/:idecita", ListarId.listarID);
    }
}

const misRutas = new Rutas();
export default misRutas.rutasApi;

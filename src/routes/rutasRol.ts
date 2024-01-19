import { Router } from "express";
import ControladorRolCrear from "../controllers/roles/crearRolControlador";
import ControladorRolEditar from "../controllers/roles/editarRolControlador";
import ControladorRolListar from "../controllers/roles/listarRolControlador";
import ListarID from "../controllers/roles/ListarRolIDController";

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
        this.rutasApi.get("/listarRol", ControladorRolListar.listarTodosRol);
        this.rutasApi.post("/crearRol", ControladorRolCrear.postRol);
        this.rutasApi.put("/editarRol", ControladorRolEditar.editarRol);
        this.rutasApi.get("/listarPorId/:idecita", ListarID.listarID);
    }
}

const misRutas = new Rutas();
export default misRutas.rutasApi;

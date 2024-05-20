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
        this.rutasApi.post("/", ControladorRolCrear.postRol);
        this.rutasApi.get("/", ControladorRolListar.listarTodosRol);
        this.rutasApi.get("/:idRol", ListarID.listarID);
        this.rutasApi.patch("/:idRol", ControladorRolEditar.editarRol);
    }
}

const misRutas = new Rutas();
export default misRutas.rutasApi;

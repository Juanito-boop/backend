import { Router } from "express";
import ControladorUsuarioCrear from "../controllers/usuarios/crearUsuarioControlador";
import ControladorUsuarioEditar from "../controllers/usuarios/editarUsuarioControlador";
import ControladorUsuarioListar from "../controllers/usuarios/listarUsuarioControlador";
import ControladorUSRolListar from "../controllers/usuarios/listarUSRolController";
import ControladorTiendaInfo from "../controllers/usuarios/TiendaInfoController";
import listarID from "../controllers/usuarios/listarUSIDController";

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
        this.rutasApi.post("/", ControladorUsuarioCrear.postUsuario);
        this.rutasApi.get("/", ControladorUsuarioListar.listarTodosUsuario);
        this.rutasApi.get("/:idRol", ControladorUSRolListar.listarUSRol);
        this.rutasApi.get("/listarInfo/:idecita", ControladorTiendaInfo.listarInfo);
        // this.rutasApi.get("/listarPorId/:idecita", listarID.listarID);
        this.rutasApi.put("/editarUsuario", ControladorUsuarioEditar.editarUsuario);
    }
}

const misRutas = new Rutas();
export default misRutas.rutasApi;

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
        this.rutasApi.get(
            "/listarUsuario",
            ControladorUsuarioListar.listarTodosUsuario
        );
        this.rutasApi.post(
            "/crearUsuario",
            ControladorUsuarioCrear.postUsuario
        );
        this.rutasApi.put(
            "/editarUsuario",
            ControladorUsuarioEditar.editarUsuario
        );
        this.rutasApi.get("/listarUSRol", ControladorUSRolListar.listarUSRol);
        this.rutasApi.get(
            "/listarInfo/:idecita",
            ControladorTiendaInfo.listarInfo
        );
        // this.rutasApi.get("/listarPorId/:idecita", listarID.listarID);
    }
}

const misRutas = new Rutas();
export default misRutas.rutasApi;

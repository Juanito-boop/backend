import { Router } from "express";

import UsuarioController from "../controllers/usuarioController";

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
        this.rutasApi.post("/", UsuarioController.insertUser);
        this.rutasApi.get("/:idTienda", UsuarioController.fetchUsers);
        this.rutasApi.get("/:idTienda/:idUsuario", UsuarioController.findUser);
        this.rutasApi.patch("/:idTienda/:idUsuario", UsuarioController.patchUser);
        this.rutasApi.delete("/:idTienda/:idUsuario", UsuarioController.deleteUser)
    }
}

const misRutas = new Rutas();
export default misRutas.rutasApi;

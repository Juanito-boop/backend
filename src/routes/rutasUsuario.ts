import { Router } from "express";

import UsuarioController from "../controllers/usuarioController";

class Rutas {
    public rutasApi: Router;

    constructor() {
        this.rutasApi = Router();
        this.config();
    }

    public config() {this.rutas();}
    public rutas() {
        this.rutasApi.post("/", UsuarioController.insertUser);
        this.rutasApi.post("/many", UsuarioController.insertUsers);
        this.rutasApi.get("/", UsuarioController.findAllUsers);
        this.rutasApi.get("/:idTienda", UsuarioController.fetchUsers);
        this.rutasApi.get("/:idTienda/:idUsuario", UsuarioController.findUser);
        this.rutasApi.patch("/:idTienda/:idUsuario", UsuarioController.patchUser);
        this.rutasApi.delete("/:idTienda/:idUsuario", UsuarioController.deleteUser);
    }
}

const misRutas = new Rutas();
export default misRutas.rutasApi;

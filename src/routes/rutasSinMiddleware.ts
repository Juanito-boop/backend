import { Router } from "express";

import UsuarioController from "../controllers/usuarioController";
// import cacheMiddleware from "../middleware/Cache";

class Rutas {
	public rutasApi: Router;
	constructor() {
		this.rutasApi = Router();
		this.config();
	}
	public config() {
	this.rutas();
	}
	public rutas() {
		this.rutasApi.post("/", UsuarioController.insertUser);
		this.rutasApi.post("/bulk", UsuarioController.insertMultipleUsers);
	}
}
const misRutas = new Rutas();
export default misRutas.rutasApi;
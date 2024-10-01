import { Router } from "express";

import UsuarioController from "../controllers/usuarioController";
import cacheMiddleware from "../middleware/Cache";

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
	// /api/v1/public/usuarios
	this.rutasApi.get(
	  "/:username",
	  cacheMiddleware(),
	  UsuarioController.fetchUser
	);
  }
}

const misRutas = new Rutas();
export default misRutas.rutasApi;

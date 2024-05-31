import { Router } from "express";

import categoriaController from "../controllers/categoriaController";
import cacheMiddleware from "../middleware/Cache";

class RutasCategorias {
  public rutasApi: Router;

  constructor() {
	this.rutasApi = Router();
	this.config();
  }

  public config() {
	this.rutas();
  }

  public rutas() {
	// /api/v1/public/categorias
	this.rutasApi.post("/", categoriaController.insertCategory);
	this.rutasApi.get(
	  "/:idTienda",
	  cacheMiddleware(60),
	  categoriaController.getStoreCategories
	);
	this.rutasApi.get(
	  "/:idTienda/:idCategoria",
	  cacheMiddleware(60),
	  categoriaController.getFilteredCategoryByStoreAndId
	);
	this.rutasApi.patch("/:idTienda/:idCategoria", categoriaController.patchStoreCategory);
	this.rutasApi.delete("/:idTienda/:idCategoria", categoriaController.deleteStoreCategoryId);
  }
}
const misRutas = new RutasCategorias();
export default misRutas.rutasApi;

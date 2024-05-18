import { Router } from "express";

import categoriaController from "../controllers/categoriaController";

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
        // /api/public/categorias
        this.rutasApi.get("/:tienda", categoriaController.getStoreCategories);
        this.rutasApi.get("/:tienda/:idCategoria", categoriaController.getFilteredCategoryByStoreAndId);
        this.rutasApi.post("/", categoriaController.insertCategory);
        this.rutasApi.patch("/:tienda/:idCategoria", categoriaController.patchStoreCategory);
        this.rutasApi.delete("/:tienda/:idCategoria", categoriaController.deleteStoreCategoryId);
    }   
}
const misRutas = new RutasCategorias();
export default misRutas.rutasApi;
import { Router } from "express";

import ProductoController from "../controllers/productoController";

class RutasProductos {
    public rutasApi: Router;
    constructor() {
        this.rutasApi = Router();
        this.config();
    }
    public config() {
        this.rutas();
    }
    public rutas() {
        this.rutasApi.post("/", ProductoController.createProduct)
        this.rutasApi.get("/:tienda", ProductoController.fetchProducts)
        this.rutasApi.get("/:tienda/:idProducto", ProductoController.filterProductById)
        this.rutasApi.patch("/:tienda/:idProducto", ProductoController.updateProduct)
        this.rutasApi.delete("/:tienda/:idProducto", ProductoController.deleteProduct)
    }
}
const misRutas = new RutasProductos();
export default misRutas.rutasApi;

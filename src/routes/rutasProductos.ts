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
        this.rutasApi.get("/:idTienda", ProductoController.fetchProducts)
        this.rutasApi.get("/:idTienda/:idProducto", ProductoController.filterProductById)
        this.rutasApi.patch("/:idTienda/:idProducto", ProductoController.updateProduct)
        this.rutasApi.delete("/:idTienda/:idProducto", ProductoController.deleteProduct)
    }
}
const misRutas = new RutasProductos();
export default misRutas.rutasApi;

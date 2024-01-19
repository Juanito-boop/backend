import express from "express";
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";

import rutasCategorias from "../../routes/rutasCategorias";
import rutasFacturas from "../../routes/rutasFacturas";
import rutasProductos from "../../routes/rutasProductos";
import rutasRol from "../../routes/rutasRol";
import rutasTienda from "../../routes/rutasTienda";
import rutasUsuario from "../../routes/rutasUsuario";
import tokenRuta from "../../routes/TokenRuta";
import seguridad from "../../middleware/Seguridad";
import rutasDetalles from "../../routes/rutasDetalles";

class Servidor {
    public app: express.Application;
    public port: String;

    constructor() {
        this.app = express();
        config({ path: "./.env" });
        this.port = process.env.SERVER_PORT || "8082";
        this.iniciarConfig();
        this.activarRutas();
    }   

    public iniciarConfig(): void {
        this.app.set("PORT", this.port);
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json({ limit: "100mb" }));
        this.app.use(express.urlencoded({ extended: true }));
    }
    public activarRutas(): void {
        this.app.use("/api/public/categorias",seguridad.revisar, rutasCategorias);
        this.app.use("/api/public/facturas",seguridad.revisar, rutasFacturas);
        this.app.use("/api/public/productos",seguridad.revisar, rutasProductos);
        this.app.use("/api/public/rol",seguridad.revisar, rutasRol);
        this.app.use("/api/public/tienda",seguridad.revisar, rutasTienda);
        this.app.use("/api/public/usuario",seguridad.revisar, rutasUsuario);
        this.app.use("/api/public/token", tokenRuta);
        this.app.use("/api/public/detalles", seguridad.revisar , rutasDetalles);
    }
    public arrancar(): void {
        const puerto = this.app.get("PORT");
        this.app.listen(puerto, () => {
            console.log("Servidor corriendo en " + puerto);
        });
    }
}

export default Servidor;

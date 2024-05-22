import   cors      from "cors";
import { config  } from "dotenv";
import   express   from "express";
import   morgan    from "morgan";

import seguridad       from "../../middleware/Seguridad";
import rutasCategorias from "../../routes/rutasCategorias";
import rutasDetalles   from "../../routes/rutasDetalles";
import rutasFacturas   from "../../routes/rutasFacturas";
import rutasProductos  from "../../routes/rutasProductos";
import rutasRol        from "../../routes/rutasRol";
import rutasTienda     from "../../routes/rutasTienda";
import rutasUsuario    from "../../routes/rutasUsuario";
import tokenRuta       from "../../routes/TokenRuta"      ;

class Servidor {
    public app: express.Application;
    public port: String;
    api:string = "/api/public/"

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
        this.app.use(`${this.api}categorias`, seguridad.revisar, rutasCategorias);// listo
        this.app.use(`${this.api}detalles`, seguridad.revisar, rutasDetalles);
        this.app.use(`${this.api}facturas`, seguridad.revisar, rutasFacturas);// listo
        this.app.use(`${this.api}productos`, seguridad.revisar, rutasProductos);// listo
        this.app.use(`${this.api}roles`, seguridad.revisar, rutasRol);
        this.app.use(`${this.api}tiendas`, seguridad.revisar, rutasTienda);// listo
        this.app.use(`${this.api}token`, tokenRuta);// listo
        this.app.use(`${this.api}usuarios`, seguridad.revisar, rutasUsuario);
    }    
    
    public arrancar(): void {
        const puerto = this.app.get("PORT");
        this.app.listen(puerto, () => {
            console.log("Servidor corriendo en " + puerto);
        });
    }
}

export default Servidor;

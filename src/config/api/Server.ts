import   cors         from "cors";
import { config     } from "dotenv";
import   express      from "express";
import   morgan       from "morgan";
import   portfinder   from 'portfinder';

import seguridad       	  from "../../middleware/Seguridad";
import rutasUsuario    	  from "../../routes/rutasUsuario";
import rutasSinMiddleware from "../../routes/rutasSinMiddleware";
import tokenRuta          from "../../routes/TokenRuta";

class Servidor {
	public app: express.Application;
	public port: String;
	v1: string = "/api/v1/public";

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
		this.app.get("/", (_req, res) => {
			res.send("hello world");
		});
		this.app.use(`${this.v1}/token`, tokenRuta); // listo
		this.app.use(`${this.v1}/crearUsuarios`, rutasSinMiddleware) //listo
		this.app.use(`${this.v1}/usuarios`, seguridad.revisar, rutasUsuario); // listo
	}

	public arrancar(): void {
		const puerto = this.app.get("PORT");

		portfinder.basePort = parseInt(puerto, 10); // Establece el puerto base para portfinder
		portfinder
			.getPortPromise()
			.then((port) => {
				this.app.listen(port, () => {
					console.log(`Servidor corriendo en el puerto ${port}`);
				});
			})
			.catch((err) => {
				console.error("No se pudo encontrar un puerto disponible:", err);
			});
	}
}

export default Servidor;

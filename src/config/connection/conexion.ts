import pgPromise from "pg-promise";
import { opcionesPG } from "./opcionConexion";
import variablesConexion from "../domain/varDB";
import Result from "../../utils/Result";

const pgp = pgPromise(opcionesPG);
const pool = pgp(variablesConexion);
const dbname = variablesConexion.database;

pool.connect()
    .then((conn) => {
        console.log("Conexion exitosa con DB: ", dbname);
        conn.done();
    })
    .catch((error) => {
        return Result.fail(`Error al conectar con la base de datos: ${error.message}`);
    });

export default pool;

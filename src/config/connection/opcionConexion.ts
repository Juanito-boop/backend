import pgPromise from "pg-promise";
import { camelizeColumns, IClient } from "./funcionConexion";

export const opcionesPG: pgPromise.IInitOptions<IClient> = {
    receive(data){
        camelizeColumns(data);
    },
};
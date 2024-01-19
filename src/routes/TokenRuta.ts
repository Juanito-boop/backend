import { Router } from "express";

import tokenControlador2 from "../controllers/token/TokenControlador";
class TokenRuta {
  public tokenRutaApi: Router;

  constructor() {
    this.tokenRutaApi = Router();
    this.lasRutas();
  }

  public lasRutas(): void {
    this.tokenRutaApi.post("/tokencreado", tokenControlador2.crearToken);
  }
}
const tokenRuta = new TokenRuta();
export default tokenRuta.tokenRutaApi;

import { Router } from "express";

import TokenController from "../controllers/tokenController";

class TokenRuta {
  public tokenRutaApi: Router;

  constructor() {
    this.tokenRutaApi = Router();
    this.lasRutas();
  }

  public lasRutas(): void {
    // /api/public/token
    this.tokenRutaApi.post("/", TokenController.createToken);
  }
}
const tokenRuta = new TokenRuta();
export default tokenRuta.tokenRutaApi;
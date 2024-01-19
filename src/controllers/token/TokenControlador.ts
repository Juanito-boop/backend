import { Request, Response } from "express";

import TokenDao from "../../dao/token/TokenDao";


class TokenControlador extends TokenDao {
  public crearToken(req: Request, res: Response): void {
    const params = Object.values(req.body);
    TokenControlador.generar(res, params);
  }
}
const permisoControlador = new TokenControlador();
export default permisoControlador;

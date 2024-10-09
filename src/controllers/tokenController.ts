import { Request, Response } from "express";
import tokenDAO from "../dao/tokenDAO";
import bcrypt from "bcrypt";

class tokenController {
  public async createToken(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    try {
      const result = await tokenDAO.getUserCredentials(username);

      if (!result.isSuccess) {
        res.status(400).json({ Respuesta: result.errorValue() });
        return;
      }

      const user = result.getValue();

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({ Respuesta: "Credenciales inválidas" });
        return;
      }

      const tokenResult = await tokenDAO.generateToken([
        username,
        user.password,
      ]);

      if (tokenResult.isSuccess) {
        res.status(200).json(tokenResult.getValue());
      } else {
        res.status(400).json(tokenResult.errorValue());
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ Respuesta: `Error al iniciar sesión: ${error.message}` });
    }
  }
}
const TokenController = new tokenController();
export default TokenController;

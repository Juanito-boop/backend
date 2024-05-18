import { Request, Response } from "express";
import { Token } from "../interface/interfaces";
import tokenDAO from "../dao/tokenDAO";

class tokenController {
  public createToken(req: Request, res: Response): void {
    const { username, password } = req.body;
    let data: Token[] = [
      username,
      password
    ];
    tokenDAO.generateToken(data, res);
  }
}

const TokenController = new tokenController();
export default TokenController;
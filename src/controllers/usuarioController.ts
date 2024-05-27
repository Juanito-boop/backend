import { Request, Response } from "express";
import { Usuario } from "../interface/interfaces";
import UsuarioDAO from "../dao/usuarioDAO";

class usuarioController {
  public static async insertUser(req: Request, res: Response): Promise<void>{
    const { username, password, id_tienda, id_rol } = req.body;
    const data: Usuario[] = [
      username,
      password,
      id_tienda,
      id_rol
    ];
    const result = await UsuarioDAO.createUser(data);
    if (result.isSuccess) {
      res.status(200).json(result.getValue());
    } else {
      res.status(400).json({ Respuesta: result.errorValue() });
    }
  }

  public static async fetchUsers(req: Request, res: Response): Promise<void>{
    const tienda: number = parseInt(req.params.idTienda);
    
    if (isNaN(tienda)) {
      res.status(400).json({ Respuesta: "El id de la tienda no es un número válido" });
      return;
    }
    
    const result = await UsuarioDAO.fetchUsers(tienda);

    if (result.isSuccess) {
      res.status(200).json(result.getValue());
    } else {
      res.status(400).json({ Respuesta: result.errorValue() });
    }
  }

  public static async findUser(req: Request, res: Response): Promise<void>{
    const idUsuario: number = parseInt(req.params.idUsuario);
    const tienda: number = parseInt(req.params.idTienda);
    
    if (isNaN(tienda) || isNaN(idUsuario)) {
      res.status(400).json({ Respuesta: "El id del usuario o de la tienda no es un número válido" });
      return;
    }

    const result = await UsuarioDAO.filterUserByStoreAndId(tienda, idUsuario);

    if (result.isSuccess) {
      res.status(200).json(result.getValue());
    } else {
      res.status(400).json({ Respuesta: result.errorValue() });
    }
  }

  public static async patchUser(req: Request, res: Response): Promise<void>{
    const idUsuario: number = parseInt(req.params.idUsuario);
    const tienda: number = parseInt(req.params.idTienda);
    const fieldsToUpdate = req.body;

    if (isNaN(idUsuario) || isNaN(tienda)) {
      res.status(400).json({ Respuesta: "El id del usuario o de la tienda no es un número válido" });
      return;
    }

    const result = await UsuarioDAO.updateUser(fieldsToUpdate, idUsuario, tienda);

    if (result.isSuccess) {
      res.status(200).json({ Respuesta: "Usuario actualizado" });
    } else {
      res.status(400).json({ Respuesta: result.errorValue() });
    }
  }

  public static async deleteUser(req: Request, res: Response): Promise<void>{
    const idUsuario: number = parseInt(req.params.idUsuario);
    const tienda: number = parseInt(req.params.idTienda);

    if (isNaN(idUsuario) || isNaN(tienda)) {
      res.status(400).json({ Respuesta: "El id del usuario o de la tienda no es un número válido" });
      return;
    }
    
    const result = await UsuarioDAO.deleteUser(tienda, idUsuario);

    if (result.isSuccess) {
      res.status(200).json({ Respuesta: "Usuario eliminado" });
    } else {
      res.status(400).json({ Respuesta: result.errorValue() });
    }
  }
}

const UsuarioController = new usuarioController();
export default UsuarioController;
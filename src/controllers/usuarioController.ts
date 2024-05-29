import { Request, Response } from "express";
import { Usuario, UsuarioBulkResult, UsuarioCreationResult, UsuarioR } from "../interface/interfaces";
import UsuarioDAO from "../dao/usuarioDAO";
import Result from "../utils/Result";

class usuarioController {
  public async insertUser(req: Request, res: Response): Promise<void> {
    const { username, password, id_tienda, id_rol } = req.body;

    if (typeof username  !== 'string' ||
        typeof password  !== 'string' ||
        typeof id_tienda !== 'number' ||
        typeof id_rol    !== 'number'
      ) {
      res.status(400).json({ Respuesta: "Invalid input data types" });
      return;
    }

    const data = { username, password, id_tienda, id_rol };
    const result: Result<UsuarioCreationResult> = await UsuarioDAO.createUser(data);

    if (result.isSuccess) {
        res.status(200).json(result.getValue());
    } else {
        res.status(400).json({ Respuesta: result.errorValue() });
    }
  } 

  public async insertUsers(req: Request, res: Response): Promise<void> {
    const users: Omit<Usuario, 'id_usuario'>[] = req.body;
    // Validación de datos de entrada
    for (const user of users) {
      const { username, password, id_tienda, id_rol } = user;
      if (typeof username  !== 'string' ||
          typeof password  !== 'string' ||
          typeof id_tienda !== 'number' ||
          typeof id_rol    !== 'number'
        ) {
        res.status(400).json({ Respuesta: "Invalid input data types" });
        return;
      }
    }

    const result: Result<UsuarioBulkResult> = await UsuarioDAO.createUsers(users);

    if (result.isSuccess) {
      res.status(200).json(result.getValue());
    } else {
      res.status(400).json(result.errorValue());
    }
  }


  public async fetchUsers(req: Request, res: Response): Promise<void>{
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

  public async findAllUsers(req: Request, res: Response): Promise<void>{
    const result: Result<UsuarioR[]> = await UsuarioDAO.finAllUsers();

    if (result.isSuccess) {
      res.status(200).json(result.getValue());
    } else {
      res.status(400).json({ Respuesta: result.errorValue() });
    }
  }

  public async findUser(req: Request, res: Response): Promise<void>{
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

  public async patchUser(req: Request, res: Response): Promise<void>{
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

  public async deleteUser(req: Request, res: Response): Promise<void>{
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
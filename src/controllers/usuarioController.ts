import { Request, Response } from "express";
import { Usuario } from "../interface/interfaces";
import UsuarioDAO from "../dao/usuarioDAO";

class usuarioController {
  public insertUser(req: Request, res: Response){
    const { username, password, id_tienda, id_rol } = req.body;
    const data: Usuario[] = [
      username,
      password,
      id_tienda,
      id_rol
    ]
    
    UsuarioDAO.createUser(data, res);
  }

  public fetchUsers(req: Request, res: Response){
    const tienda: number = parseInt(req.params.idTienda);
    
    if (isNaN(tienda)) {
      res.status(400).json({ Respuesta: "El id de la tienda no es un número válido" });
      return;
    }
    
    UsuarioDAO.fetchUsers(tienda, res);
  }

  public findUser(req: Request, res: Response){
    const idUsuario: number = parseInt(req.params.idUsuario);
    const tienda: number = parseInt(req.params.idTienda);
    
    if (isNaN(tienda) || isNaN(idUsuario)) {
      res.status(400).json({ Respuesta: "El id del usuario o de la tienda no es un número válido" });
      return;
    }
    
    UsuarioDAO.filterUserByStoreAndId(tienda, idUsuario, res);
  }

  public patchUser(req: Request, res: Response){
    const idUsuario: number = parseInt(req.params.idUsuario);
    const tienda: number = parseInt(req.params.idTienda);
    const fieldsToUpdate = req.body;

    if (isNaN(idUsuario) || isNaN(tienda)) {
      res.status(400).json({ Respuesta: "El id del usuario o de la tienda no es un número válido" });
      return;
    }
    
    if (Object.keys(fieldsToUpdate).length === 0) {
      res.status(400).json({ Respuesta: "No se proporcionaron campos para actualizar" });
      return;
    }
    try {
      UsuarioDAO.updateUser(fieldsToUpdate, idUsuario, tienda, res);
    } catch (error) {
      res.status(500).json({ Respuesta: "Error actualizando el usuario", error });
    }
  }

  public deleteUser(req: Request, res: Response){
    const idUsuario: number = parseInt(req.params.idUsuario);
    const tienda: number = parseInt(req.params.idTienda);

    if (isNaN(idUsuario) || isNaN(tienda)) {
      res.status(400).json({ Respuesta: "El id del usuario o de la tienda no es un número válido" });
      return;
    }

    try {
      UsuarioDAO.deleteUser(tienda, idUsuario,  res);
    } catch (error) {
      res.status(500).json({ Respuesta: "Error eliminando el usuario", error });
    }
  }
}

const UsuarioController = new usuarioController();
export default UsuarioController;
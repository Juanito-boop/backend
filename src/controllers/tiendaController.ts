import { Request, Response } from "express";
import tiendaDAO from "../dao/tiendaDAO";
import { Tienda } from "../interface/interfaces";

class TiendaController {
  public insertStore(req: Request, res: Response): void {
    const { nombre, direccion, telefono } = req.body;
    let data: Tienda[] = [
      nombre,
      direccion,
      telefono
    ];
    tiendaDAO.addNewStore(data, res);
  }

  public getStores(res: Response): void {
    tiendaDAO.fetchStores(res);
  }

  public getEmployeeCounterStores(res: Response): void {
    tiendaDAO.fetchEmployeeCounterStores(res);
  }
  
  public getFilteredStoreById(req: Request, res: Response): void {
    const idTienda: number = parseInt(req.params.idTienda);

    if (isNaN(idTienda)) {
      res.status(400).json({ Respuesta: "El id de la tienda debe ser un número" });
      return;
    }

    tiendaDAO.filterStoreById(idTienda, res);
  }

  public patchStore(req: Request, res: Response): void {
    const idTienda: number = parseInt(req.params.idTienda);
    const fieldsToUpdate: Tienda = req.body;

    if (isNaN(idTienda)) {
      res.status(400).json({ Respuesta: "El id de la tienda debe ser un número" });
      return;
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      res.status(400).json({ Respuesta: "No se proporcionaron campos para actualizar" });
      return;
    }

    try {
      tiendaDAO.updateStore(fieldsToUpdate, idTienda, res);
    } catch (error) {
      res.status(500).json({ Respuesta: "Error actualizando la tienda", error });
    }
  }

  public deleteStore(req: Request, res: Response): void {
    const idTienda: number = parseInt(req.params.idTienda);
    
    if (isNaN(idTienda)) {
      res.status(400).json({ Respuesta: "El id de la tienda debe ser un número" });
      return;
    }
    
    try {
      tiendaDAO.deleteStore(idTienda, res)
    } catch (error) {
      res.status(500).json({ Respuesta: "Error eliminando la tienda", error });
    }
  }
}

const tiendaController = new TiendaController();
export default tiendaController;
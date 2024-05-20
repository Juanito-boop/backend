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

  public getStores(_req: Request, res: Response): void {
    tiendaDAO.fetchStores(res);
  }

  public getEmployeeCounterStores(_req: Request, res: Response): void {
    tiendaDAO.fetchEmployeeCounterStores(res);
  }
  
  public getFilteredStoreById(req: Request, res: Response): void {
    const idTienda: number = parseInt(req.params.idTienda);
    tiendaDAO.filterStoreById(idTienda, res);
  }

  public patchStore(req: Request, res: Response): void {
    const idTienda: number = parseInt(req.params.idTienda);
    const fieldsToUpdate: Tienda = req.body;

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
    try {
      tiendaDAO.deleteStore(idTienda, res)
    } catch (error) {
      res.status(500).json({ Respuesta: "Error eliminando la tienda", error });
    }
  }
}

const tiendaController = new TiendaController();
export default tiendaController;
import { Request, Response } from "express";
import FacturaDAO from "../dao/FacturaDAO";
import { Factura } from "../interface/interfaces";

class FacturaController {
  public async insertInvoice(req: Request, res: Response): Promise<void> {
    const { fecha_venta, vendedor_factura, cantidad_producto, id_tienda } = req.body;
    const data: Factura[] = [
      fecha_venta,
      vendedor_factura,
      cantidad_producto,
      id_tienda
    ];
    const result = await FacturaDAO.insertInvoice(data);

    if (result.isSuccess) {
      res.status(200).json(result.getValue());
    } else {
      res.status(400).json({ Respuesta: result.errorValue() });
    }
  }

  public async getStoreInvoices(req: Request, res: Response): Promise<void> {
    const tienda: number = parseInt(req.params.idTienda);

    if (isNaN(tienda)) {
      res.status(400).json({ Respuesta: "El id de la tienda debe ser un número" });
      return;
    }

    const result = await FacturaDAO.fetchStoreInvoices(tienda);

    if (result.isSuccess) {
      res.status(200).json(result.getValue());
    } else {
      res.status(400).json({ Respuesta: result.errorValue() });
    }
  }

  public async getFilteredInvoicesByStoreAndId(req: Request, res: Response): Promise<void> {
    const tienda: number = parseInt(req.params.idTienda);
    const idFactura: number = parseInt(req.params.idFactura);

    if (isNaN(tienda) || isNaN(idFactura)) {
      res.status(400).json({ Respuesta: "El id de la tienda y de la factura deben ser números" });
      return;
    }

    const result = await FacturaDAO.filterInvoiceIdByStore(tienda, idFactura);

    if (result.isSuccess) {
      res.status(200).json(result.getValue());
    } else {
      res.status(400).json({ Respuesta: result.errorValue() });
    }
  }

  public async patchStoreInvoice(req: Request, res: Response): Promise<void> {
    const tienda: number = parseInt(req.params.idTienda);
    const idFactura: number = parseInt(req.params.idFactura);
    const fieldsToUpdate: Factura = req.body;

    if (isNaN(tienda) || isNaN(idFactura)) {
      res.status(400).json({ Respuesta: "El id de la tienda y de la factura deben ser números" });
      return;
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      res.status(400).json({ Respuesta: "No se proporcionaron campos para actualizar" });
      return;
    }

    const result = await FacturaDAO.updateInvoice(fieldsToUpdate, idFactura, tienda);

    if (result.isSuccess) {
      res.status(200).json({ Respuesta: result.getValue() });
    } else {
      res.status(400).json({ Respuesta: result.errorValue() });
    }
  }

  public async deleteStoreInvoiceId(req: Request, res: Response): Promise<void> {
    const tienda: number = parseInt(req.params.idTienda);
    const idFactura: number = parseInt(req.params.idFactura);

    if (isNaN(tienda) || isNaN(idFactura)) {
      res.status(400).json({ Respuesta: "El id de la tienda y de la factura deben ser números" });
      return;
    }

    const result = await FacturaDAO.deleteInvoice(tienda, idFactura);

    if (result.isSuccess) {
      res.status(200).json({ Respuesta: result.getValue() });
    } else {
      res.status(400).json({ Respuesta: result.errorValue() });
    }
  }

  public async getStoreAnnualInvoices(req: Request, res: Response): Promise<void> {
    const tienda: number = parseInt(req.params.idTienda);

    if (isNaN(tienda)) {
      res.status(400).json({ Respuesta: "El id de la tienda debe ser un número" });
      return;
    }

    const result = await FacturaDAO.countInvoicesTypeByStore(tienda, 'anual');

    if (result.isSuccess) {
      res.status(200).json(result.getValue());
    } else {
      res.status(400).json({ Respuesta: result.errorValue() });
    }
  }

  public async getStoreMonthlyInvoices(req: Request, res: Response): Promise<void> {
    const tienda: number = parseInt(req.params.idTienda);

    if (isNaN(tienda)) {
      res.status(400).json({ Respuesta: "El id de la tienda debe ser un número" });
      return;
    }

    const result = await FacturaDAO.countInvoicesTypeByStore(tienda, 'mensual');

    if (result.isSuccess) {
      res.status(200).json(result.getValue());
    } else {
      res.status(400).json({ Respuesta: result.errorValue() });
    }
  }

  public async getStoreDailyInvoices(req: Request, res: Response): Promise<void> {
    const tienda: number = parseInt(req.params.idTienda);

    if (isNaN(tienda)) {
      res.status(400).json({ Respuesta: "El id de la tienda debe ser un número" });
      return;
    }

    const result = await FacturaDAO.countInvoicesTypeByStore(tienda, 'diaria');

    if (result.isSuccess) {
      res.status(200).json(result.getValue());
    } else {
      res.status(400).json({ Respuesta: result.errorValue() });
    }
  }
}

const controladorFacturas = new FacturaController();
export default controladorFacturas;

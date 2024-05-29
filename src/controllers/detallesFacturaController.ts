import { Request, Response } from "express";
import DetalleFacturaDAO from "../dao/detalleFacturaDAO";

class DetallesFacturaController {
  public async insertInvoiceWithDetails(req: Request, res: Response): Promise<void> {
    const { factura, detalles } = req.body;

    // Validación de los datos de entrada
    if (!factura || !Array.isArray(detalles)) {
      res.status(400).json({ Respuesta: "Invalid input data types" });
      return;
    }

    const result = await DetalleFacturaDAO.insertInvoiceWithDetails(factura, detalles);

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

    const result = await DetalleFacturaDAO.fetchStoreInvoices(tienda);

    if (result.isSuccess) {
      res.status(200).json(result.getValue());
    } else {
      res.status(400).json({ Respuesta: result.errorValue() });
    }
  }
}

const detallesFacturaController = new DetallesFacturaController();
export default detallesFacturaController;
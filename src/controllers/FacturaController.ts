import { Request, Response } from "express";
import FacturaDAO from "../dao/FacturaDAO";
import { Factura } from "../interface/interfaces";

class FacturaController {
  public insertInvoice(req: Request, res: Response): void {
    const { fecha_venta, vendedor_factura, cantidad_producto, id_tienda } = req.body;
    const data: Factura[] = [ 
      fecha_venta, 
      vendedor_factura, 
      cantidad_producto, 
      id_tienda 
    ];
    FacturaDAO.insertInvoice(data, res);
  }

  public getStoreInvoices(req: Request, res: Response): void {
    const tienda: number = parseInt(req.params.tienda);
    FacturaDAO.fetchStoreInvoices(tienda, res);
  }
  
  public getFilteredInvoicesByStoreAndId(req: Request, res: Response): void {
    const tienda: number = parseInt(req.params.tienda);
    const idFactura: number = parseInt(req.params.idFactura);
    FacturaDAO.filterInvoiceIdByStore(tienda, idFactura, res);
  }

  public patchStoreInvoice(req: Request, res: Response): void {
    const tienda: number = parseInt(req.params.tienda);
    const idFactura: number = parseInt(req.params.idFactura);
    const fieldsToUpdate: Factura = req.body;

    if (Object.keys(fieldsToUpdate).length === 0) {
      res.status(400).json({ Respuesta: "No se proporcionaron campos para actualizar" });
      return;
    }

    try {
      FacturaDAO.updateInvoice(fieldsToUpdate, idFactura, tienda, res);
    } catch (error) {
      res.status(500).json({ Respuesta: "Error actualizando la factura", error });
    }
  }

  public deleteStoreInvoiceId(req: Request, res: Response): void {
    const tienda: number = parseInt(req.params.tienda);
    const idFactura: number = parseInt(req.params.idFactura);
    try {
      FacturaDAO.deleteInvoice(tienda, idFactura, res)
    } catch (error) {
      res.status(500).json({ Respuesta: "Error eliminando la factura", error });
    }
  }

  public getStoreAnnualInvoices(req: Request, res: Response): void {
    const tienda: number = parseInt(req.params.tienda);
    FacturaDAO.countInvoicesTypeByStore(tienda, 'anual', res);
  }

  public getStoreMonthlyInvoices(req: Request, res: Response): void {
    const tienda: number = parseInt(req.params.tienda);
    FacturaDAO.countInvoicesTypeByStore(tienda, 'mensual', res);
  }

  public getStoreDailyInvoices(req: Request, res: Response): void {
    const tienda: number = parseInt(req.params.tienda);
    FacturaDAO.countInvoicesTypeByStore(tienda, 'diaria', res);
  }
}

const controladorFacturas = new FacturaController();
export default controladorFacturas;
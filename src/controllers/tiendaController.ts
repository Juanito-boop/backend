import { Request, Response } from "express";
import tiendaDAO from "../dao/tiendaDAO";
import { Tienda } from "../interface/interfaces";

class TiendaController {
	public async insertStore(req: Request, res: Response): Promise<void> {
		const data: Tienda[] = req.body;
		const result = await tiendaDAO.addNewStore(data);

		if (result.isSuccess) {
			res.status(200).json(result.getValue());
		} else {
			res.status(400).json({ Respuesta: result.errorValue() });
		}
	}

	public async fetchStores(_req: Request, res: Response): Promise<void> {
		const result = await tiendaDAO.fetchStores();

		if (result.isSuccess) {
			res.status(200).json(result.getValue());
		} else {
			res.status(400).json({ Respuesta: result.errorValue() });
		}
	}

	public async fetchEmployeeCounterStores(req: Request, res: Response): Promise<void> {
		const limit = parseInt(req.query.limit as string) || 50;
		const offset = parseInt(req.query.offset as string) || 0;

		const result = await tiendaDAO.fetchEmployeeCounterStores(limit, offset);

		if (result.isSuccess) {
			res.status(200).json(result.getValue());
		} else {
			res.status(400).json({ Respuesta: result.errorValue() });
		}
	}

	public async filterStoreById(req: Request, res: Response): Promise<void> {
		const idStore: number = parseInt(req.params.idTienda);
		const result = await tiendaDAO.filterStoreById(idStore);

		if (result.isSuccess) {
			res.status(200).json(result.getValue());
		} else {
			res.status(400).json({ Respuesta: result.errorValue() });
		}
	}

	public async patchStore(req: Request, res: Response): Promise<void> {
		const idTienda: number = parseInt(req.params.idTienda);
		const fieldsToUpdate: Tienda = req.body;

		if (isNaN(idTienda)) {
			res.status(400).json({ Respuesta: "El id de la tienda debe ser un número" });
			return;
		}

		const result = await tiendaDAO.updateStore(fieldsToUpdate, idTienda);

		if (result.isSuccess) {
			res.status(200).json({ Respuesta: "Tienda actualizada" });
		} else {
			res.status(400).json({ Respuesta: result.errorValue() });
		}
	}

	public async deleteStore(req: Request, res: Response): Promise<void> {
		const idTienda: number = parseInt(req.params.idTienda);

		if (isNaN(idTienda)) {
			res.status(400).json({ Respuesta: "El id de la tienda debe ser un número" });
			return;
		}

		const result = await tiendaDAO.deleteStore(idTienda);

		if (result.isSuccess) {
			res.status(200).json({ Respuesta: "Tienda eliminada" });
		} else {
			res.status(400).json({ Respuesta: result.errorValue() });
		}
	}
}

const tiendaController = new TiendaController();
export default tiendaController;

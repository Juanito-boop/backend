import { Request, Response } from "express";
import CategoriaDAO from "../dao/categoriaDAO";
import { Categoria } from "../interface/interfaces";

class CategoriaController {
  public async insertCategory(req: Request, res: Response): Promise<void> {
    const { nombre, descripcion, id_tienda } = req.body;
    const data: Categoria[] = [
      nombre,
      descripcion,
      id_tienda
    ];

    const result = await CategoriaDAO.insertCategory(data);

    if (result.isSuccess) {
      res.status(200).json(result.getValue());
    } else {
      res.status(400).json({ Respuesta: result.errorValue() });
    }
  }

  public async getStoreCategories(req: Request, res: Response): Promise<void> {
    const tienda: number = parseInt(req.params.idTienda);

    if (isNaN(tienda)) {
      res.status(400).json({ Respuesta: "El id de la tienda no es un numero" });
      return;
    }

    const result = await CategoriaDAO.fetchCategories(tienda);

    if (result.isSuccess) {
      res.status(200).json(result.getValue());
    } else {
      res.status(400).json({ Respuesta: result.errorValue() });
    }
  }

  public async getFilteredCategoryByStoreAndId(req: Request, res: Response): Promise<void> {
    const tienda: number = parseInt(req.params.idTienda);
    const idCategoria: number = parseInt(req.params.idCategoria);

    if (isNaN(tienda) || isNaN(idCategoria)) {
      res.status(400).json({ Respuesta: "El id de la tienda o de la categoria no es un numero" });
      return;
    }

    const result = await CategoriaDAO.filterCategoryIdByStore(tienda, idCategoria);

    if (result.isSuccess) {
      res.status(200).json(result.getValue());
    } else {
      res.status(400).json({ Respuesta: result.errorValue() });
    }
  }

  public async patchStoreCategory(req: Request, res: Response): Promise<void> {
    const tienda: number = parseInt(req.params.idTienda);
    const idCategoria: number = parseInt(req.params.idCategoria);
    const fieldsToUpdate: Categoria = req.body;

    if (isNaN(tienda) || isNaN(idCategoria)) {
      res.status(400).json({ Respuesta: "El id de la tienda o de la categoria no es un numero" });
      return;
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      res.status(400).json({ Respuesta: "No se proporcionaron campos para actualizar" });
      return;
    }

    const result = await CategoriaDAO.updateCategory(fieldsToUpdate, tienda, idCategoria);

    if (result.isSuccess) {
      res.status(200).json({ Respuesta: result.getValue() });
    } else {
      res.status(400).json({ Respuesta: result.errorValue() });
    }
  }

  public async deleteStoreCategoryId(req: Request, res: Response): Promise<void> {
    const tienda: number = parseInt(req.params.idTienda);
    const idCategoria: number = parseInt(req.params.idCategoria);

    if (isNaN(tienda) || isNaN(idCategoria)) {
      res.status(400).json({ Respuesta: "El id de la tienda o de la categoria no es un numero" });
      return;
    }

    const result = await CategoriaDAO.deleteCategory(tienda, idCategoria);

    if (result.isSuccess) {
      res.status(200).json({ Respuesta: result.getValue() });
    } else {
      res.status(400).json({ Respuesta: result.errorValue() });
    }
  }
}

const categoriaController = new CategoriaController();
export default categoriaController;

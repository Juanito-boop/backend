import { Request, Response } from "express";
import CategoriaDAO from "../dao/categoriaDAO";
import { Categoria } from "../interface/interfaces";

class CategoriaController{
  public insertCategory(req: Request, res: Response): void {
    const { nombre, descripcion, id_tienda } = req.body;
    let data: Categoria[] = [
      nombre,
      descripcion,
      id_tienda
    ];
    CategoriaDAO.insertCategory(data, res);
  }

  public getStoreCategories(req: Request, res: Response): void {
    const tienda: number = parseInt(req.params.idTienda);

    if (isNaN(tienda)) {
      res.status(400).json({ Respuesta: "El id de la tienda no es un numero" });
      return;
    }

    CategoriaDAO.fetchCategories(tienda, res);
  }

  public getFilteredCategoryByStoreAndId(req: Request, res: Response): void {
    const tienda: number = parseInt(req.params.idTienda);
    const idCategoria: number = parseInt(req.params.idCategoria);

    if (isNaN(tienda) || isNaN(idCategoria)) {
      res.status(400).json({ Respuesta: "El id de la tienda o de la categoria no es un numero" });
      return;
    }

    CategoriaDAO.filterCategoryIdByStore(tienda, idCategoria, res);
  }

  public patchStoreCategory(req: Request, res: Response): void {
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

    try {
      CategoriaDAO.updateCategory(fieldsToUpdate, tienda, idCategoria, res);
    } catch (error) {
      res.status(500).json({ Respuesta: "Error actualizando la categoria", error });
    }
  }

  public deleteStoreCategoryId(req: Request, res: Response): void {
    const tienda: number = parseInt(req.params.idTienda);
    const idCategoria: number = parseInt(req.params.idCategoria);

    if (isNaN(tienda) || isNaN(idCategoria)) {
      res.status(400).json({ Respuesta: "El id de la tienda o de la categoria no es un numero" });
      return;
    }
    
    try {
      CategoriaDAO.deleteCategory(tienda, idCategoria, res)
    } catch (error) {
      res.status(500).json({ Respuesta: "Error eliminando la categoria", error });
    }
  }
}

const categoriaController = new CategoriaController();
export default categoriaController;
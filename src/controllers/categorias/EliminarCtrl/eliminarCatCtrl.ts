import { Request, Response } from "express";

import eliminarCatDAO from "../../../dao/categorias/EliminarDao/eliminarCatDAO";
import { SQL_CATEGORIAS } from "../../../respository/categorias/categoriasCRUD";

class eliminarCategoria extends eliminarCatDAO {
    public borrar(req: Request, res: Response): void {
        const codigo = req.params.id;
        const parametro = [codigo];
        eliminarCategoria.borrar(SQL_CATEGORIAS.ELIMINAR, parametro, res);
    }
}

const ctrlEliminarEstu = new eliminarCategoria();
export default ctrlEliminarEstu;

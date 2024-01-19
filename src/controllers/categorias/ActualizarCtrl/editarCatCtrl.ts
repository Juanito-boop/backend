import { Request, Response } from "express";

import editarCatDAO from "../../../dao/categorias/ActualizarDao/editarCatDAO";
import { SQL_CATEGORIAS } from "../../../respository/categorias/categoriasCRUD";

class editarCategoria extends editarCatDAO {
    public editar(req: Request, res: Response): void {
        const { nombre, descripcion, id_categoria } = req.body;
        const datos = [nombre, descripcion, id_categoria];

        editarCategoria.editar(SQL_CATEGORIAS.ACTUALIZAR, datos, res);
    }
}

const ctrlEditarEstu = new editarCategoria();
export default ctrlEditarEstu;

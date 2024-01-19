import { Request, Response } from "express";

import crearCatDAO from "../../../dao/categorias/CrearDAO/crearCatDAO";
import { SQL_CATEGORIAS } from "../../../respository/categorias/categoriasCRUD";

class crearCategoria extends crearCatDAO {
    public crear(req: Request, res: Response): void {
        const { nombre, descripcion } = req.body;
        const datos = [nombre, descripcion];

        crearCategoria.crear(
            SQL_CATEGORIAS.VERIFICAR,
            SQL_CATEGORIAS.CREAR,
            datos,
            res
        );
    }
}

const crtlCrearEstu = new crearCategoria();
export default crtlCrearEstu;

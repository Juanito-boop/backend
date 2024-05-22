import { Request, Response} from 'express';
import { Producto } from '../interface/interfaces';
import productoDAO from '../dao/productoDAO';

class productoController {
  public static async createProduct(req: Request, res: Response) {
    const { nombre, marca, precio_unitario, fecha_caducidad, descripcion, stock, id_categoria, id_tienda } = req.body;
    const data: Producto[] = [ 
      nombre, 
      marca, 
      precio_unitario, 
      fecha_caducidad, 
      descripcion, 
      stock, 
      id_categoria, 
      id_tienda 
    ];
    productoDAO.insertProduct(data, res);
  };

  public static async fetchProducts(req: Request, res: Response) {
    const tienda: number = parseInt(req.params.idTienda);

    if (isNaN(tienda)) {
      res.status(400).json({ Respuesta: "El id de la tienda debe ser un número" });
      return;
    }

    productoDAO.fetchProducts(tienda, res);
  };

  public static async filterProductById(req: Request, res: Response) {
    const tienda: number = parseInt(req.params.idTienda);
    const idProducto: number = parseInt(req.params.idProducto);

    if (isNaN(tienda) || isNaN(idProducto)) {
      res.status(400).json({ Respuesta: "El id de la tienda y del producto deben ser números" });
      return;
    }

    productoDAO.filterProductById(tienda, idProducto, res);
  };

  public static async updateProduct(req: Request, res: Response) {
    const tienda: number = parseInt(req.params.idTienda);
    const idProducto: number = parseInt(req.params.idProducto);
    const fieldsToUpdate: Producto = req.body;

    if (isNaN(tienda) || isNaN(idProducto)) {
      res.status(400).json({ Respuesta: "El id de la tienda y del producto deben ser números" });
      return;
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      res.status(400).json({ Respuesta: "No se proporcionaron campos para actualizar" });
      return;
    }

    try {
      productoDAO.updateProduct(fieldsToUpdate, idProducto, tienda, res);
    } catch (error) {
      res.status(500).json({ Respuesta: "Error actualizando el producto", error });
    }
  };

  public static async deleteProduct(req: Request, res: Response) {
    const tienda: number = parseInt(req.params.idTienda);
    const idProducto: number = parseInt(req.params.idProducto);

    if (isNaN(tienda) || isNaN(idProducto)) {
      res.status(400).json({ Respuesta: "El id de la tienda y del producto deben ser números" });
      return;
    }
    
    try {
      productoDAO.deleteProduct(tienda, idProducto, res)
    } catch (error) {
      res.status(500).json({ Respuesta: "Error eliminando el producto", error });
    }
  };
}

const ProductoController = productoController;
export default ProductoController;
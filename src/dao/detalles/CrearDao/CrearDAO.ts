import { Response } from "express";
import pool from "../../../config/connection/conexion";

class CrearProductosDAO {
  protected static async crearProductos(
      sql_crear: string,
      detalles: any[],
      res: Response
  ): Promise<any> {
      try {
          for (const detalle of detalles) {
              const sql_insertar = sql_crear;
              const parametros = [
                detalle.id, 
                detalle.nombre_producto, 
                detalle.valor_producto_unitario, 
                detalle.valor_producto_total, 
                detalle.vendedor, 
                detalle.fecha_venta, 
                detalle.cantidad_producto, 
                detalle.id_tienda
              ];
              await pool.result(sql_insertar, parametros);
          }
          return res.status(200).json({
              Mensaje: "Productos creados exitosamente",
          });
      } catch (error) {
          console.log("Hubo un error: ", error);
          res.status(400).json({
              Mensaje: "Error creando productos",
          });
      }
  }
}

export default CrearProductosDAO;
export const SQL_DETALLES = {
  LISTAR: "SELECT * FROM detalles_facturas whre id_tienda = $1",
  CREAR: "INSERT INTO detalles (id, nombre_producto, valor_producto_unitario, valor_producto_total, vendedor, fecha_venta, cantidad_producto, id_tienda) VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
}
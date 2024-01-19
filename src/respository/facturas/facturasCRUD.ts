export const SQL_FACTURAS = {
    LISTAR: "SELECT * FROM facturas",
    CREAR: "INSERT INTO facturas (fecha_venta, vendedor_factura, cantidad_producto, id_tienda) VALUES ($1,$2,$3,$4) RETURNING id_factura",
    ELIMINAR: "DELETE FROM facturas e WHERE e.id_factura = $1",
    ACTUALIZAR: "UPDATE facturas SET fecha_venta = $1, vendedor_factura = $2, cantidad_producto = $3, id_tienda = $4 WHERE id_factura = $5",
    TOTAL: "SELECT f.id_factura, f.fecha_venta, SUM(p.precio_unitario * f.cantidad_producto) AS total_venta FROM facturas f JOIN productos p ON f.id_factura = p.id_factura GROUP BY f.id_factura, f.fecha_venta",
    LISTARPORID: "SELECT * FROM facturas WHERE id_factura = $1",
    LISTARPORTIENDA: "SELECT * FROM facturas WHERE id_tienda = $1",
};

export const SQL_PRODUCTOS = {
    LISTAR: "SELECT * FROM productos",
    CREAR: "INSERT INTO productos (nombre, marca, precio_unitario, fecha_caducidad, descripcion, stock, id_categoria, id_tienda) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id_producto",
    VERIFICAR: "SELECT COUNT(id_producto) AS Cantidad FROM productos e WHERE lower(e.nombre) = lower($1)",
    ELIMINAR: "DELETE FROM productos e WHERE e.id_producto = $1",
    ACTUALIZAR: "UPDATE productos SET nombre = $1, marca = $2, precio_unitario = $3, fecha_caducidad = $4, descripcion = $5, stock = $6, id_categoria = $7, id_tienda = $8 WHERE id_producto = $9",
    VARIEDAD: "SELECT c.nombre, COUNT(DISTINCT p.id_producto) AS num_productos FROM categorias c JOIN productos p ON c.id_categoria = p.id_categoria GROUP BY c.nombre;",
    DATE_SQL: "SELECT f.fecha_venta, SUM(f.cantidad_producto) FROM facturas f WHERE f.fecha_venta BETWEEN $1 AND $2 GROUP BY f.fecha_venta",
    LISTARPORID: "select * from productos where id_tienda = $1",    
};

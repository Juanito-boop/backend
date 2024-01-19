export const SQL_TIENDA = {
    LISTAR_TODOS: "SELECT * FROM tiendas",
    CREAR: "INSERT INTO tiendas (nombre_tienda,direccion_tienda,telefono_tienda,propietario_tienda) VALUES($1,$2,$3,$4) RETURNING id_tienda",
    VERIFICAR: "SELECT COUNT(t.id_tienda) AS cantidad FROM tiendas t WHERE lower(t.nombre_tienda) = lower($1)",
    ELIMINAR: "DELETE FROM tiendas WHERE id_tienda = $1",
    EDITAR: "UPDATE tiendas SET nombre_tienda = $1,direccion_tienda= $2,telefono_tienda= $3,propietario_tienda= $4 WHERE id_tienda = $5",
    EMPLEADOS: "SELECT t.nombre_tienda, COUNT(u.id_usuario) FROM tiendas t JOIN usuarios u ON t.id_tienda = u.id_tienda GROUP BY t.nombre_tienda;",
    LISTARPORID: "SELECT * FROM tiendas WHERE id_tienda=$1",
};

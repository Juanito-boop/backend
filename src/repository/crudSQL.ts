export const SQL_CATEGORIAS = {
    createCategory: "INSERT INTO categorias (nombre, descripcion, id_tienda) VALUES ($1,$2,$3) RETURNING id_categoria",
    checkCategoryExists: "SELECT 1 FROM categorias WHERE id_tienda = $1 AND id_categoria = $2",
    getCategoriesByStoreId: "SELECT id_categoria, nombre, descripcion, id_tienda FROM categorias where id_tienda = $1",
    getCategoriesByStoreAndId: "SELECT id_categoria, nombre, descripcion, id_tienda FROM categorias WHERE id_tienda = $1 AND id_categoria = $2",
    isCategoryDuplicate: "SELECT COUNT(*) > 0 AS exists FROM categorias WHERE lower(nombre) = lower($1) and lower(descripcion) = lower($2) and id_tienda = $3;",
    deleteCategory: "DELETE FROM categorias e WHERE e.id_categoria = $1",
    getProductsByStock: "SELECT c.nombre, p.nombre, p.marca FROM categorias c JOIN productos p ON c.id_categoria = p.id_categoria WHERE p.stock = $1",
};

export const SQL_DETALLES = {
    getInvoiceDetailsByStoreAndID: "SELECT * FROM detalles_facturas where id_tienda = $1 and id_factura = $2",
    insertNewDetail: "INSERT INTO detalles (id, nombre_producto, valor_producto_unitario, valor_producto_total, vendedor, fecha_venta, cantidad_producto, id_tienda) VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
};

export const SQL_FACTURAS = {
    createInvoice: "INSERT INTO facturas (fecha_venta, vendedor_factura, cantidad_producto, id_tienda) VALUES ($1, $2, $3, $4) RETURNING id_factura",
    isInvoiceDuplicate: "SELECT COUNT(*) > 0 AS exists FROM facturas WHERE fecha_venta = $1 and lower(vendedor_factura) = lower($2) and cantidad_producto = lower($3) and lower(id_tienda) = lower($4)",
    checkInvoiceExists: "SELECT 1 FROM facturas WHERE id_tienda = $1 AND id_factura = $2",
    getTotalSales: "SELECT f.id_factura, f.fecha_venta, SUM(p.precio_unitario * f.cantidad_producto) AS total_venta FROM facturas f JOIN productos p ON f.id_factura = p.id_factura GROUP BY f.id_factura, f.fecha_venta",
    getInvoicesByStoreId: "SELECT id_factura, fecha_venta, vendedor_factura, cantidad_producto, id_tienda FROM facturas WHERE id_tienda = $1",
    getInvoiceByStoreAndId: "SELECT id_factura, fecha_venta, vendedor_factura, cantidad_producto, id_tienda FROM facturas WHERE id_tienda = $1 AND id_factura = $2",
    deleteInvoice: "DELETE FROM facturas WHERE id_tienda = $1 and id_factura = $2",

    storeAnnualInvoiceCounter: "SELECT COUNT(*) FILTER (WHERE EXTRACT(YEAR FROM fecha_venta) = EXTRACT(YEAR FROM current_date) AND id_tienda = $1) AS facturas_anuales FROM facturas;", 
    storeMonthlyInvoiceCounter: "SELECT COUNT(*) FILTER (WHERE EXTRACT(MONTH FROM fecha_venta) = EXTRACT(MONTH FROM current_date) AND id_tienda = $1) AS facturas_mensuales FROM facturas;",
    storeDailyInvoiceCounter: "SELECT COUNT(*) FILTER (WHERE fecha_venta::DATE = current_date::DATE AND id_tienda = $1) AS facturas_diarias FROM facturas;"
};

export const SQL_PRODUCTOS = {
    getProductsByStoreId: "SELECT * FROM productos where id_tienda = $1",
    CREAR: "INSERT INTO productos (nombre, marca, precio_unitario, fecha_caducidad, descripcion, stock, id_categoria, id_tienda) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id_producto",
    checkProductExists: "SELECT 1 FROM productos WHERE id_tienda = $1 AND id_producto = $2",
    isProductDuplicate: "SELECT COUNT(*) > 0 AS exists FROM productos WHERE lower(nombre) = lower($1) and lower(marca) = lower($2) and precio_unitario = $3 and fecha_caducidad = $4 and lower(descripcion) = lower($5) and stock = $6 and id_categoria = $7 and id_tienda = $8",
    ELIMINAR: "DELETE FROM productos e WHERE e.id_producto = $1",
    ACTUALIZAR: "UPDATE productos SET nombre = $1, marca = $2, precio_unitario = $3, fecha_caducidad = $4, descripcion = $5, stock = $6, id_categoria = $7, id_tienda = $8 WHERE id_producto = $9",
    VARIEDAD: "SELECT c.nombre, COUNT(DISTINCT p.id_producto) AS num_productos FROM categorias c JOIN productos p ON c.id_categoria = p.id_categoria GROUP BY c.nombre;",
    DATE_SQL: "SELECT f.fecha_venta, SUM(f.cantidad_producto) FROM facturas f WHERE f.fecha_venta BETWEEN $1 AND $2 GROUP BY f.fecha_venta",
    LISTARPORID: "SELECT * FROM productos WHERE id_tienda = $1",    
};

export const SQL_ROL = {
    LISTAR_TODOS: "SELECT * FROM roles",
    CREAR: "INSERT INTO roles (nombre_rol) VALUES($1) RETURNING id_rol",
    VERIFICAR:
        "SELECT COUNT(r.id_rol) AS cantidad FROM roles r WHERE lower(r.nombre_rol) = lower($1)",
    EDITAR: "UPDATE roles SET nombre_rol = $1 WHERE id_rol = $2",
    LISTARPORID: "SELECT * FROM roles WHERE id_rol=$1",
};

export const SQL_TIENDAS = {
    createStore: "INSERT INTO tiendas (nombre_tienda, direccion_tienda, telefono_tienda) VALUES ($1, $2, $3) RETURNING id_tienda",
    checkStoreExists: "SELECT 1 FROM tiendas WHERE id_tienda = $1",
    isStoreDuplicate: "SELECT COUNT(*) > 0 AS exists FROM tiendas WHERE lower(nombre_tienda) = lower($1) and lower(direccion_tienda) = lower($2) and lower(telefono_tienda) = lower($3) and lower(propietario_tienda) = lower($4)",
    getStores: "SELECT id_tienda, nombre_tienda, direccion_tienda, telefono_tienda FROM tiendas",
    getStoreById: "SELECT id_tienda, nombre_tienda, direccion_tienda, telefono_tienda FROM tiendas WHERE id_tienda = $1",
    employeeCounter: 'SELECT t.id_tienda as "id", t.nombre_tienda as "tienda", COUNT(u.id_usuario)::integer as "# empleados" FROM tiendas t JOIN usuarios u ON t.id_tienda = u.id_tienda GROUP BY t.id_tienda, t.nombre_tienda ORDER BY t.id_tienda ASC',
    deleteStore: "DELETE FROM tiendas WHERE id_tienda = $1",
}

export const SQL_TOKEN ={
    getUserToken: "SELECT u.username, u.id_tienda, r.nombre_rol FROM usuarios u INNER JOIN roles r ON r.id_rol = u.id_rol where u.username = $1 and u.password = $2",
};

export const SQL_USUARIO = {
    fetchUsers: "SELECT * FROM usuarios where id_tienda = $1",
    insertUser: "INSERT INTO usuarios (username, password, id_tienda, id_rol) VALUES($1,$2,$3,$4) RETURNING id_usuario",
    checkUserExists: "SELECT 1 FROM usuarios WHERE id_usuario = $1 AND id_tienda = $2",
    isUserDuplicate: "SELECT COUNT(u.id_usuario) AS cantidad FROM usuarios u WHERE lower(u.username) = lower($1) and lower(u.password) = lower($2) and u.id_tienda = $3 and u.id_rol = $4",
    updateUser: "UPDATE usuarios SET username = $1,password= $2,id_tienda= $3,id_rol=$4 WHERE id_usuario = $5",
    roleUsersCount: "SELECT r.nombre_rol, COUNT(ru.id_usuario) FROM roles r JOIN roles_usuarios ru ON r.id_rol = ru.id_rol GROUP BY r.nombre_rol;",
    findUserByUsernameAndPassword: "SELECT * FROM usuarios WHERE username = $1 AND password = $2;",
    getUsersByStoreId: "SELECT * FROM usuarios WHERE id_tienda=$1",
    findUserById: "SELECT * FROM usuarios WHERE id_usuario=$1",
    findUserByStoreAndId: "SELECT * FROM usuarios WHERE id_usuario=$1 AND id_tienda=$2",
    deleteUser: "DELETE FROM usuarios WHERE id_usuario = $1 and id_tienda = $2",
};
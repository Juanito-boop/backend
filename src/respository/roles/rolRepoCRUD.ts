export const SQL_ROL = {
    LISTAR_TODOS: "SELECT * FROM roles",
    CREAR: "INSERT INTO roles (nombre_rol) VALUES($1) RETURNING id_rol",
    VERIFICAR:
        "SELECT COUNT(r.id_rol) AS cantidad FROM roles r WHERE lower(r.nombre_rol) = lower($1)",
    EDITAR: "UPDATE roles SET nombre_rol = $1 WHERE id_rol = $2",
    LISTARPORID: "SELECT * FROM roles WHERE id_rol=$1",
};

export const SQL_USUARIO = {
    LISTAR_TODOS: "SELECT * FROM usuarios",
    CREAR: "INSERT INTO usuarios (username,password,id_tienda,id_rol) VALUES($1,$2,$3,$4) RETURNING id_usuario",
    VERIFICAR: "SELECT COUNT(u.id_usuario) AS cantidad FROM usuarios u WHERE lower(u.username) = lower($1)",
    EDITAR: "UPDATE usuarios SET username = $1,password= $2,id_tienda= $3,id_rol=$4 WHERE id_usuario = $5",
    CONTAR: "SELECT r.nombre_rol, COUNT(ru.id_usuario) FROM roles r JOIN roles_usuarios ru ON r.id_rol = ru.id_rol GROUP BY r.nombre_rol;",
    BUSCAR: "SELECT * FROM usuarios WHERE username = $1 AND password = $2;",
    TIENDAINFO: "SELECT * FROM usuarios WHERE id_tienda=$1",
    LISTARPORID: "SELECT * FROM usuarios WHERE id_usuario=$1",
};

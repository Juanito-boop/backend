export const SQL_USUARIO = {
    LISTAR_TODOS: "SELECT * FROM usuarios where id_tienda=$1",
    BUSCARUSUARIOPORID: "SELECT * FROM usuarios WHERE id_usuario=$1 and id_tienda=$2",
    CREARUSUARIO: 'INSERT INTO usuarios (username, "password", id_tienda, id_rol) values ($1,$2,$3,$4) RETURNING id_usuario',
    usuarioexiste: "select count(*) as cantidad from usuarios where username=$1 and password=$2",
    EDITARUSUARIO: "UPDATE usuarios SET username=$1, assword= $2, id_tienda= $3, id_rol=$4 WHERE id_usuario=$5",
    CONTARUSUARIOSPORROL: "SELECT r.nombre_rol, COUNT(*) AS cantidad_usuarios FROM public.usuarios u JOIN public.roles r ON u.id_rol = r.id_rol GROUP BY r.nombre_rol",
    BUSCAR: 'SELECT id_usuario, username, "password", id_tienda, id_rol FROM usuarios WHERE username=$1 AND password=$2',
    TIENDAINFO: 'SELECT id_usuario, username, "password", id_tienda, id_rol FROM usuarios WHERE id_tienda=$1',
}
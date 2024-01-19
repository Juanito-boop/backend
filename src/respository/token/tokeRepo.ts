export const SQL_TOKEN ={
  TOKEN: "SELECT u.username, u.id_tienda, r.nombre_rol FROM usuarios u INNER JOIN roles r ON r.id_rol = u.id_rol where u.username = $1 and u.password = $2",
}
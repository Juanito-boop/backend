export const SQL_TOKEN = {
	getUserToken: `
	  SELECT 
		u.username, 
		r.nombre_rol AS role 
	  FROM users u 
	  INNER JOIN roles r ON r.id_rol = u.role 
	  WHERE u.username = $1 
	  AND u.password_hash = $2`,
  };

export const SQL_USUARIO = {
	fetchUser: "SELECT * FROM users WHERE username = $1;",
	findAllUsers: `
		SELECT 
			users.nombre, 
			users.apellido, 
			users.username, 
			roles.nombre_rol 
		FROM users JOIN roles ON users.role = roles.id_rol;`,
	insertUser: `
    	INSERT INTO users (nombre, apellido, email, username, password_hash, avatar_url, role, created_at, updated_at) 
    	VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) 
    	RETURNING user_id;`,
	checkUserExists: `
		SELECT user_id 
		FROM users 
		WHERE email = $1 OR username = $2;`,
	isUserDuplicate: "SELECT COUNT(u.id_usuario) AS cantidad FROM usuarios u WHERE lower(u.username) = lower($1) and lower(u.password) = lower($2) and u.id_tienda = $3 and u.id_rol = $4",
	updateUser: "UPDATE usuarios SET username = $1,password= $2,id_tienda= $3,id_rol=$4 WHERE id_usuario = $5",
	roleUsersCount: "SELECT r.nombre_rol, COUNT(ru.id_usuario) FROM roles r JOIN roles_usuarios ru ON r.id_rol = ru.id_rol GROUP BY r.nombre_rol;",
	findUserByUsernameAndPassword: "SELECT * FROM usuarios WHERE username = $1 AND password = $2;",
	getUsersByStoreId: "SELECT usuarios.id_usuario, roles.nombre_rol as rol, usuarios.username, tiendas.nombre_tienda as tienda FROM usuarios JOIN roles ON usuarios.id_rol = roles.id_rol JOIN tiendas ON usuarios.id_tienda = tiendas.id_tienda WHERE id_tienda=$1",
	findUserById: "SELECT * FROM usuarios WHERE id_usuario=$1",
	findUserByStoreAndId: "SELECT * FROM usuarios WHERE id_usuario=$1 AND id_tienda=$2",
	deleteUser: "DELETE FROM usuarios WHERE id_usuario = $1 and id_tienda = $2",
};
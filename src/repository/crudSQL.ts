export const SQL_TOKEN = {
  getUserToken: `
	  SELECT 
			u.username, 
			r.nombre_rol AS role 
	  FROM users u 
	  INNER JOIN roles r ON r.id_rol = u.role 
	  WHERE u.username = $1 AND u.password = $2`,
  getUserCredentials: `
		SELECT 
			password 
		FROM users 
		WHERE username = $1;`,
};

export const SQL_USUARIO = {
  fetchUser: `
		SELECT 
			users.user_id, users.nombre, users.apellido, 
			users.email, users.username, users.avatar_url, 
			roles.nombre_rol as rol, created_at, updated_at
		FROM users 
		JOIN roles ON users.role = roles.id_rol 
		WHERE users.username = $1;`,
  findAllUsers: `
		SELECT 
			users.nombre, users.apellido, users.username, 
			roles.nombre_rol as rol
		FROM users 
		JOIN roles ON users.role = roles.id_rol;`,
  insertUser: `
		INSERT INTO 
			users (
				nombre, apellido, email, 
				username, password, avatar_url, 
				role, created_at, updated_at) 
		VALUES (
			$1, $2, $3, 
			$4, $5, $6, 
			$7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) 
		RETURNING user_id;`,
  checkUserExists: `
		SELECT 
			user_id 
		FROM users 
		WHERE email = $1 OR username = $2;`,
};
export interface User {
	user_id:    string;
	nombre:     string;
	apellido:   string;
	email:      string;
	username:   string;
	password: 	string;
	avatar_url: string;
	role: 			number;
	created_at: Date;
	updated_at: Date;
}

export interface Token {
	username: string;
	password: string;
}

export interface DataToken{
	username: string;
	role: string;
}

export interface UsuarioCreationResult {
  user_id: string;
}

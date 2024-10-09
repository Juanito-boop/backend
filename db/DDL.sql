-- Active: 1727760906032@@aws-0-us-west-1.pooler.supabase.com@6543@postgres
DO $$
DECLARE
	r RECORD;
BEGIN
	FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
		EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE;';
	END LOOP;
	
	IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'uuid-ossp') THEN
		EXECUTE 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";';
	END IF;

	EXECUTE '
	CREATE TABLE IF NOT EXISTS roles (
		id_rol serial4 NOT NULL,
		nombre_rol varchar NOT NULL,
		CONSTRAINT roles_pkey PRIMARY KEY (id_rol)
	);

	INSERT INTO roles (nombre_rol) VALUES 
		(''administrador''),
		(''usuario''),
		(''proveedor''),
		(''establecimiento'')
	ON CONFLICT DO NOTHING;';

	EXECUTE '
	CREATE TABLE IF NOT EXISTS users (
		user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), 
		nombre VARCHAR(100) NOT NULL,
		apellido VARCHAR(100) NOT NULL,
		email VARCHAR(100) UNIQUE NOT NULL,
		username VARCHAR(50) UNIQUE NOT NULL,
		password TEXT NOT NULL,
		avatar_url TEXT,
		role INT NOT NULL,
		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
		CONSTRAINT fk_role FOREIGN KEY (role) REFERENCES roles (id_rol)
	);';
END $$;
-- Active: 1724424858906@@aws-0-us-west-1.pooler.supabase.com@6543@postgres@public
BEGIN;
-- Creación de la tabla roles
CREATE TABLE IF NOT EXISTS roles (
	id_rol serial4 NOT NULL,
	nombre_rol varchar NOT NULL,
	CONSTRAINT roles_pkey PRIMARY KEY (id_rol)
);

-- Creación de la tabla tiendas
CREATE TABLE IF NOT EXISTS tiendas (
	id_tienda serial4 NOT NULL,
	nombre_tienda varchar NOT NULL,
	direccion_tienda varchar NOT NULL,
	telefono_tienda varchar NOT NULL,
	propietario_tienda varchar NOT NULL,
	CONSTRAINT tiendas_pkey PRIMARY KEY (id_tienda)
);

-- Creación de la tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
	id_usuario serial4 NOT NULL,
	username varchar NOT NULL,
	"password" varchar NOT NULL,
	id_tienda int4 NOT NULL,
	id_rol int4 NOT NULL,
	CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario)
);

-- Creación de la tabla categorias
CREATE TABLE IF NOT EXISTS categorias (
	id_categoria serial4 NOT NULL,
	nombre varchar NOT NULL,
	descripcion varchar NOT NULL,
	id_tienda int4 NOT NULL,
	CONSTRAINT categorias_pkey PRIMARY KEY (id_categoria)
);

-- Creación de la tabla facturas
CREATE TABLE IF NOT EXISTS facturas (
	id_factura serial4 NOT NULL,
	fecha_venta date NOT NULL,
	vendedor_factura varchar NOT NULL,
	cantidad_producto int4 NOT NULL,
	id_tienda int4 NOT NULL,
	CONSTRAINT facturas_pkey PRIMARY KEY (id_factura)
);

-- Creación de la tabla productos
CREATE TABLE IF NOT EXISTS productos (
	id_producto serial4 NOT NULL,
	nombre varchar NOT NULL,
	marca varchar NOT NULL,
	precio_unitario float8 NOT NULL,
	fecha_caducidad date NOT NULL,
	descripcion varchar NOT NULL,
	stock int4 NOT NULL,
	id_categoria int4 NOT NULL,
	id_tienda int4 NOT NULL,
	CONSTRAINT productos_pkey PRIMARY KEY (id_producto)
);

-- Creación de la tabla detalles_facturas
CREATE TABLE IF NOT EXISTS detalles_facturas (
	id_detalle_factura serial4 NOT NULL,
	cantidad_producto int4 NOT NULL,
	fecha_creacion date NOT NULL,
	id_factura int4 NOT NULL,
	id_producto int4 NOT NULL,
	CONSTRAINT detalles_facturas_pkey PRIMARY KEY (id_detalle_factura)
);

-- Adición de claves foráneas a la tabla usuarios
ALTER TABLE usuarios ADD CONSTRAINT fk_roles_to_usuarios FOREIGN KEY (id_rol) REFERENCES roles(id_rol);

ALTER TABLE usuarios ADD CONSTRAINT fk_tiendas_to_usuarios FOREIGN KEY (id_tienda) REFERENCES tiendas(id_tienda);

-- Adición de claves foráneas a la tabla categorias
ALTER TABLE categorias ADD CONSTRAINT fk_tiendas_to_categorias FOREIGN KEY (id_tienda) REFERENCES tiendas(id_tienda);

-- Adición de claves foráneas a la tabla facturas
ALTER TABLE facturas ADD CONSTRAINT fk_tiendas_to_facturas FOREIGN KEY (id_tienda) REFERENCES tiendas(id_tienda);

-- Adición de claves foráneas a la tabla productos
ALTER TABLE productos ADD CONSTRAINT fk_categorias_to_productos FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria);

ALTER TABLE productos ADD CONSTRAINT fk_tiendas_to_productos FOREIGN KEY (id_tienda) REFERENCES tiendas(id_tienda);

-- Adición de claves foráneas a la tabla detalles_facturas
ALTER TABLE detalles_facturas ADD CONSTRAINT fk_facturas_to_detalles_facturas FOREIGN KEY (id_factura) REFERENCES facturas(id_factura);

ALTER TABLE detalles_facturas ADD CONSTRAINT fk_productos_to_detalles_facturas FOREIGN KEY (id_producto) REFERENCES productos(id_producto);
COMMIT;
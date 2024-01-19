-- tiendas
CREATE TABLE
    tiendas(
        id_tienda SERIAL PRIMARY KEY NOT NULL,
        nombre_tienda VARCHAR(50) NOT NULL,
        direccion_tienda VARCHAR(50) NOT NULL,
        telefono_tienda VARCHAR(15) NOT NULL,
        propietario_tienda VARCHAR(50) NOT NULL
    );

INSERT INTO tiendas (
  id_tienda, 
  nombre_tienda, 
  direccion_tienda, 
  telefono_tienda, 
  propietario_tienda
  ) values 
  (1, 'Tienda C', 'Calle 123', '042-554-2167', 'Diego'), 
  (2, 'Tienda B', 'Carrera 45', '456-511-8514', 'Pedro'), 
  (3, 'Tienda A', 'Callejon 7', '016-724-0140', 'Carlos'), 
  (4, 'Tienda C', 'Avenida Central', '122-379-7319', 'Sofía'), 
  (5, 'Tienda A', 'Calle 123', '188-917-7599', 'Juan'), 
  (6, 'Tienda A', 'Avenida Central', '871-634-3578', 'Pedro'), 
  (7, 'Tienda B', 'Avenida Principal', '616-800-0719', 'Diego'), 
  (8, 'Tienda A', 'Avenida Principal', '789-400-7507', 'Juan'), 
  (9, 'Tienda A', 'Calle 123', '922-655-5269', 'Diego'), 
  (10, 'Tienda E', 'Callejon 7', '839-234-4060', 'Laura'), 
  (11, 'Tienda A', 'Avenida Principal', '490-365-4939', 'Ana'), 
  (12, 'Tienda E', 'Avenida Principal', '459-252-0375', 'Laura'), 
  (13, 'Tienda D', 'Callejon 7', '884-267-5515', 'Pedro'), 
  (14, 'Tienda A', 'Callejon 7', '014-852-2857', 'Juan'), 
  (15, 'Tienda C', 'Calle 123', '413-854-9448', 'Luis'), 
  (16, 'Tienda B', 'Avenida Principal', '793-138-8457', 'Diego'), 
  (17, 'Tienda A', 'Carrera 45', '245-386-2358', 'Valentina'), 
  (18, 'Tienda C', 'Callejon 7', '487-433-7448', 'Laura'), 
  (19, 'Tienda E', 'Carrera 45', '731-212-9282', 'Valentina'), 
  (20, 'Tienda A', 'Carrera 45', '374-734-3622', 'Ana'), 
  (21, 'Tienda B', 'Avenida Principal', '916-332-2869', 'María'), 
  (22, 'Tienda B', 'Callejon 7', '856-356-0142', 'Juan'), 
  (23, 'Tienda E', 'Carrera 45', '356-391-1926', 'Luis'), 
  (24, 'Tienda C', 'Carrera 45', '606-067-2073', 'María'), 
  (25, 'Tienda D', 'Avenida Central', '009-832-8020', 'Ana'), 
  (26, 'Tienda B', 'Calle 123', '912-585-4649', 'Carlos'), 
  (27, 'Tienda C', 'Avenida Principal', '634-301-4702', 'Sofía'), 
  (28, 'Tienda E', 'Calle 123', '298-689-6737', 'Sofía'), 
  (29, 'Tienda D', 'Callejon 7', '924-949-5605', 'Ana'), 
  (30, 'Tienda C', 'Callejon 7', '504-343-4158', 'Juan'), 
  (31, 'Tienda A', 'Avenida Principal', '088-127-4804', 'María'), 
  (32, 'Tienda C', 'Avenida Principal', '219-900-3404', 'Pedro'), 
  (33, 'Tienda D', 'Calle 123', '995-822-9337', 'Diego'), 
  (34, 'Tienda E', 'Carrera 45', '198-569-8382', 'Luis'), 
  (35, 'Tienda C', 'Avenida Principal', '126-722-6338', 'Sofía'), 
  (36, 'Tienda B', 'Avenida Principal', '509-311-4053', 'Pedro'), 
  (37, 'Tienda E', 'Avenida Central', '352-213-3612', 'Valentina'), 
  (38, 'Tienda C', 'Calle 123', '610-839-8762', 'Carlos'), 
  (39, 'Tienda D', 'Avenida Principal', '239-934-0854', 'Laura'), 
  (40, 'Tienda B', 'Avenida Principal', '594-845-1495', 'Pedro'), 
  (41, 'Tienda B', 'Avenida Central', '897-171-3141', 'Diego'), 
  (42, 'Tienda B', 'Calle 123', '327-723-8430', 'Pedro'), 
  (43, 'Tienda C', 'Callejon 7', '822-868-7296', 'Pedro'), 
  (44, 'Tienda A', 'Carrera 45', '936-584-6460', 'Ana'), 
  (45, 'Tienda B', 'Calle 123', '089-893-0359', 'Laura'), 
  (46, 'Tienda E', 'Calle 123', '555-526-6297', 'Carlos'), 
  (47, 'Tienda D', 'Callejon 7', '574-304-8872', 'Carlos'), 
  (48, 'Tienda B', 'Carrera 45', '561-088-1135', 'Carlos'), 
  (49, 'Tienda A', 'Avenida Principal', '261-787-0920', 'Laura'), 
  (50, 'Tienda B', 'Calle 123', '010-667-8626', 'Luis');

-- roles
CREATE TABLE
    roles (
        id_rol SERIAL PRIMARY KEY NOT NULL,
        nombre_rol VARCHAR(50) NOT NULL,
        UNIQUE(nombre_rol)
    );

INSERT INTO roles (
  id_rol, 
  nombre_rol
  ) values 
  (2, 'cashier'), 
  (3, 'stock clerk'), 
  (4, 'manager'), 
  (5, 'sales associate'), 
  (6, 'visual merchandiser');

-- usuarios
CREATE TABLE
    usuarios(
        id_usuario SERIAL PRIMARY KEY NOT NULL,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        id_tienda INT4 NOT NULL,
        id_rol INT4 NOT NULL,
        UNIQUE(username),
        CONSTRAINT FK_TIENDAS_USUARIOS FOREIGN KEY(id_tienda) 
        REFERENCES tiendas(id_tienda) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT FK_ROLES_USUARIOS FOREIGN KEY(id_rol) 
        REFERENCES roles(id_rol) ON DELETE CASCADE ON UPDATE NO ACTION
    );

INSERT INTO usuarios (
  id_usuario, 
  username, 
  password, 
  id_tienda, 
  id_rol
  ) values 
  (2, 'Michael', '8x8wdUdo', 28, 4), 
  (4, 'Sophia', '54hw922B', 39, 3), 
  (5, 'Olivia', 'c267AM7X', 6, 6), 
  (6, 'Isabella', '5O1NW2Pc', 17, 5), 
  (11, 'David', 'iQHV83m3', 24, 3), 
  (20, 'John', 'R0Z7blcI', 38, 6), 
  (24, 'Daniel', '634T4Kum', 30, 6), 
  (27, 'Emily', 'uC7UZ7EY', 45, 5), 
  (30, 'Emma', '027ab77P', 29, 6);

-- facturas
CREATE TABLE
    facturas(
        id_factura SERIAL PRIMARY KEY NOT NULL,
        fecha_venta DATE NOT NULL,
        vendedor_factura VARCHAR(100) NOT NULL,
        cantidad_producto INT NOT NULL,
        id_tienda INT4 NOT NULL,
        CONSTRAINT FK_TIENDAS_FACTURAS FOREIGN KEY(id_tienda) 
        REFERENCES tiendas(id_tienda) ON DELETE CASCADE ON UPDATE NO ACTION
    );

INSERT INTO facturas (
  id_factura, 
  fecha_venta, 
  vendedor_factura, 
  cantidad_producto, 
  id_tienda
  ) values 
  (1, '2022-12-20', 'Valentina', 164, 25), 
  (2, '2023-07-27', 'Juan', 71, 17), 
  (3, '2023-01-23', 'Carlos', 60, 28), 
  (4, '2023-05-11', 'Luis', 123, 48), 
  (5, '2023-05-16', 'Valentina', 76, 47), 
  (6, '2023-11-13', 'Valentina', 119, 43), 
  (7, '2023-06-30', 'Sofia', 25, 26), 
  (8, '2023-10-06', 'Laura', 196, 49), 
  (9, '2023-05-05', 'Laura', 54, 3), 
  (10, '2023-09-28', 'Pedro', 65, 49), 
  (11, '2023-05-25', 'Valentina', 141, 13), 
  (12, '2023-09-11', 'Pedro', 166, 12), 
  (13, '2023-04-18', 'Pedro', 103, 26), 
  (14, '2023-04-29', 'Juan', 183, 41), 
  (15, '2023-08-15', 'Laura', 185, 20), 
  (16, '2023-01-26', 'Juan', 195, 38), 
  (17, '2023-01-11', 'Carlos', 171, 50), 
  (18, '2023-10-06', 'Luis', 115, 5), 
  (19, '2023-04-15', 'Laura', 45, 5), 
  (20, '2023-07-10', 'Juan', 41, 25);

CREATE TABLE
    categorias(
        id_categoria SERIAL PRIMARY KEY NOT NULL,
        nombre VARCHAR(50) NOT NULL,
        descripcion VARCHAR(140),
        UNIQUE(nombre)
    );

-- categorias
INSERT INTO categorias (
  id_categoria, 
  nombre, 
  descripcion
  ) values 
  (2, 'Books', 'Calcetines'), 
  (3, 'Beauty', 'Pantalón'), 
  (4, 'Clothing', 'Camiseta'), 
  (5, 'Sports', 'Camiseta'), 
  (6, 'Home Decor', 'Zapatos'), 
  (7, 'Toys', 'Camiseta');

-- productos
CREATE TABLE
    productos (
        id_producto SERIAL PRIMARY KEY NOT NULL,
        nombre VARCHAR(50) NOT NULL,
        marca VARCHAR(50) NOT NULL,
        precio_unitario FLOAT NOT NULL,
        fecha_caducidad DATE,
        descripcion VARCHAR(255) NOT NULL,
        stock INT NOT NULL,
        id_categoria INT4 NOT NULL,
        CONSTRAINT FK_CATEGORIAS_PRODUCTOS FOREIGN KEY(id_categoria) REFERENCES categorias(id_categoria) ON DELETE CASCADE ON UPDATE NO ACTION
    );

INSERT INTO productos (id_producto, nombre, marca, precio_unitario, fecha_caducidad, descripcion, stock, id_categoria,id_tienda
  ) values 
  (1, 'Harina', 'Dynabox', 995.7, '2024-09-08', 'Camisa', 152, 2, 1), 
  (2, 'Pan', 'Feedbug', 411.83, '2024-09-13', 'Camisa', 38, 7, 1), 
  (3, 'Aceite', 'Dynabox', 976.54, '2023-07-24', 'Camisa', 165, 7), 
  (4, 'Sal', 'Dabvine', 460.13, '2023-03-05', 'Sombrero', 87, 4), 
  (5, 'Pan', 'Realbuzz', 503.81, '2023-02-14', 'Pantalón', 176, 7), 
  (6, 'Sal', 'Jayo', 873.02, '2024-05-23', 'Zapatos', 171, 6), 
  (7, 'Azúcar', 'Ntags', 364.38, '2023-10-15', 'Sombrero', 154, 7), 
  (8, 'Pasta', 'Brainverse', 175.62, '2022-12-05', 'Bufanda', 193, 3), 
  (9, 'Harina', 'Dynabox', 155.49, '2023-09-06', 'Bufanda', 52, 5), 
  (10, 'Pan', 'Avamm', 647.18, '2024-04-06', 'Zapatos', 95, 3), 
  (11, 'Leche', 'Vitz', 332.12, '2023-10-23', 'Camisa', 142, 3), 
  (12, 'Sal', 'Meemm', 397.68, '2024-03-09', 'Zapatos', 12, 5), 
  (13, 'Arroz', 'Oozz', 527.79, '2023-05-31', 'Zapatos', 166, 2), 
  (14, 'Aceite', 'Topicware', 84.52, '2023-10-25', 'Zapatos', 177, 3), 
  (15, 'Arroz', 'Wikizz', 244.24, '2024-03-10', 'Camisa', 60, 4), 
  (16, 'Azúcar', 'Divape', 608.66, '2023-12-10', 'Zapatos', 45, 5), 
  (17, 'Azúcar', 'Browseblab', 796.04, '2023-07-11', 'Pantalón', 28, 7), 
  (18, 'Harina', 'Snaptags', 370.59, '2023-07-24', 'Sombrero', 126, 6), 
  (19, 'Café', 'Oloo', 34.45, '2024-09-29', 'Bufanda', 122, 6), 
  (20, 'Café', 'Skidoo', 56.95, '2023-07-20', 'Pantalón', 105, 6);

-- detalles facturas
CREATE TABLE detalles_facturas(
    id_detalle_factura SERIAL PRIMARY KEY NOT NULL,
    id_factura INT4 NOT NULL,
    id_producto INT4 NOT NULL,
    cantidad_producto INT NOT NULL,
    fecha_creacion DATE NOT NULL,
    CONSTRAINT FK_FACTURAS_DETALLES FOREIGN KEY(id_factura) REFERENCES facturas(id_factura) ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT FK_PRODUCTOS_DETALLES FOREIGN KEY(id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE ON UPDATE NO ACTION
);

INSERT INTO detalles_facturas (id_producto,fecha_creacion,cantidad_producto,id_factura) 
VALUES
(1, '2024-09-08', 152, 17),
(2, '2024-09-13', 38, 1),
(3, '2023-07-24', 165, 10),
(4, '2023-03-05', 87, 12),
(5, '2023-02-14', 176, 14),
(6, '2024-05-23', 171, 15),
(7, '2023-10-15', 154, 13),
(8, '2022-12-05', 193, 10),
(9, '2023-09-06', 52, 16),
(10, '2024-04-06', 95, 4),
(11, '2023-10-23', 142, 11),
(12, '2024-03-09', 12, 5),
(13, '2023-05-31', 166, 13),
(14, '2023-10-25', 177, 19),
(15, '2024-03-10', 60, 6),
(16, '2023-12-10', 45, 16),
(17, '2023-07-11', 28, 10),
(18, '2023-07-24', 126, 9),
(19, '2024-09-29', 122, 8),
(20, '2023-07-20', 105, 1);

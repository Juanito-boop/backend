export type contador = "anual" | "mensual" | "diaria"

export interface Rol {
  id_rol: number;
  nombre_rol: string;
}

export interface Tienda {
  id_tienda: number;
  nombre_tienda: string;
  direccion_tienda: string;
  telefono_tienda: string;
  propietario_tienda: string;
}

export interface Categoria {
  id_categoria: number;
  nombre: string;
  descripcion: string;
  id_tienda: number;
}

export interface Factura {
  id_factura?: number;
  fecha_venta: Date;
  vendedor_factura: string;
  cantidad_producto: number;
  id_tienda: number;
}

export interface Producto {
  id_producto: number;
  nombre: string;
  marca: string;
  precio_unitario: number;
  fecha_caducidad: string;
  descripcion: string;
  stock: number;
  id_categoria: number;
  id_tienda: number;
}

export interface Usuario {
  id_usuario: number;
  username: string;
  password: string;
  id_tienda: number;
  id_rol: number;
}

export interface UsuarioBulkResult {
  created: UsuarioCreationResult[];
  errors: string[];
}

export interface UsuarioR {
  id_usuario: number;
  rol: string;
  username: string;
  tienda: string;
}

export interface DetalleFactura {
  id_detalle_factura?: number;
  cantidad_producto: number;
  fecha_creacion: Date;
  id_factura?: number;
  id_producto: number;
}

export interface Token {
  username: string;
  password: string;
}

export interface DataToken{
  username: string;
  id_tienda: number;
  nombre_rol: string;
}

export interface Empleados{
  id: number;
  tienda: string;
  "# empleados": number;
}

export interface Exists{
  exists: boolean;
}

export interface CategoriaCreationResult {
  id_categoria: number;
}

export interface FacturaCreationResult {
  id_factura: number;
}

export interface DetalleFacturaCreationResult {}

export interface TiendaCreationResult {
  id_tienda: number;
}

export interface ProductoCreationResult {
  id_producto: number;
}

export interface RolCreationResult {}

export interface UsuarioCreationResult {
  id_usuario: number;
}

export const SQL_CATEGORIAS = {
    LISTAR: "SELECT * FROM categorias",
    CREAR: "INSERT INTO categorias (nombre, descripcion) VALUES ($1,$2) RETURNING id_categoria",
    VERIFICAR: "SELECT COUNT(id_categoria) AS Cantidad FROM categorias e WHERE lower(e.nombre) = lower($1)",
    ELIMINAR: "DELETE FROM categorias e WHERE e.id_categoria = $1",
    ACTUALIZAR: "UPDATE categorias SET nombre = $1, descripcion = $2 WHERE id_categoria = $3",
    COMPROBACION: "SELECT c.nombre, p.nombre, p.marca FROM categorias c JOIN productos p ON c.id_categoria = p.id_categoria WHERE p.stock = $1",
    LISTARID: "SELECT * FROM categorias WHERE id_categoria=$1",    
};

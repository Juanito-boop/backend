export const SQL_INVOICE_FILTER = {
  DATE: "SELECT * FROM facturas  WHERE fecha_venta = $1 ORDER BY fecha_venta ASC; ", //ESTA SIRVE
  YEAR: "SELECT count(*) FROM facturas WHERE EXTRACT(YEAR FROM fecha_venta) = $1 AND id_tienda = $2",
  MONTH: "SELECT count(*) FROM facturas WHERE EXTRACT(MONTH FROM fecha_venta) = $1 AND id_tienda = $2",
  DAY: "SELECT count(*) FROM facturas WHERE fecha_venta = $1 AND id_tienda = $2",
};

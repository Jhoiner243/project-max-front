export interface FacturasEntity {
  detalles: DetallesFacturasEntity[];
  id_cliente: string;
  total: number ;
}

export interface DetallesFacturasEntity {
  id_producto: string;
  cantidad: number;
  precio_venta: number;
}
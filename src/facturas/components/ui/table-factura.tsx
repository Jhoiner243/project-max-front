/* eslint-disable react/react-in-jsx-scope */

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProductos } from "../../../productos/context/producto.context";
import { useFactura } from "../../context/factura.context";

export function TableFactura() {
  const { factura } = useFactura();
const { productos } = useProductos();

const productoName = () => {
  const product = productos.find(p => p.id === factura.detalles[0].id_producto);
  console.log(product)
  return product ? product.nombre : [];
};

  return (
    <Table>
      <TableCaption>Factura de pedido</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Producto</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead className="text-right">Monto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {factura.detalles.map((detalle) => (
          <TableRow key={detalle.id_producto}>
            <TableCell className="font-medium">{productoName() || ''}</TableCell>
            <TableCell>{detalle.cantidad}</TableCell>
            <TableCell className="text-right">
              ${detalle.cantidad * detalle.precio_venta}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">${factura.total}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
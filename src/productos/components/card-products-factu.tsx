/* eslint-disable react/react-in-jsx-scope */

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { memo } from "react"
import useFacturaHook from "../../facturas/hooks/use-factura"
import { useProductos } from "../context/producto.context"
import { ProductEntity } from "../types/producto.entity"

type CardProps = React.ComponentProps<typeof Card>

// Componente memoizado para mejor rendimiento
export const ProductCard = memo(({
  producto,
  selected,
  onClick
}: {
  producto:  ProductEntity
  selected: boolean
  onClick: (id: string) => void
}) => {
  // Función de ayuda para el indicador de stock
  const getStockIndicatorClass = (stock: number) =>
    stock < 10 ? "bg-red-500" : "bg-sky-500"

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onClick(producto.id)}
      onKeyDown={(e) => e.key === "Enter" && onClick(producto.id)}
      className={cn(
        "w-[82px] h-[69px] transition-all cursor-pointer",
        "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary",
        selected && "ring-2 ring-primary"
      )}
    >
      <CardHeader className="pr-1 pl-1 px-4">
        <CardTitle className="text-sm truncate ">
          {producto.nombre}
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-xs pl-2">
          <span>{producto.stock}</span>
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              getStockIndicatorClass(producto.stock)
            )}
          />
        </CardDescription>
      </CardHeader>
    </Card>
  )
})

ProductCard.displayName = "ProductCard"
export function CardProducts({ className, ...props }: CardProps) {
  const { productos } = useProductos()
  const {handleSelect, selected} = useFacturaHook()

  return (
    <div className={cn("flex flex-1 gap-3 m-5", className)} {...props}>
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          selected={selected === producto.id}
          onClick={handleSelect}
        />
      ))}
    </div>
  )
}
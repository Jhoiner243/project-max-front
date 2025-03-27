/* eslint-disable react/react-in-jsx-scope */
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { getFetchWithCancel } from "../../hooks/use-fetch-cancel";
import { type ProductEntity } from '../types/producto.entity';

interface FacturaContext {
  productos : ProductEntity[]
  onSubmitProductos : (factura: ProductEntity) => void;
  isLoading: boolean;
  errors: string | null
}

const ProductoContext = createContext<FacturaContext | undefined>(undefined);

export const ProductoProvider = ({children}: {children: ReactNode}) => {
  const [productos, setProductos] = useState<ProductEntity[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setError] = useState<string | null>(null);

  const getProductos = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await getFetchWithCancel<ProductEntity[]>("/productos", "GET")
      if(data) setProductos(data)
    } catch(err){
      setError(err instanceof Error ? err.message : "Error fetch productos")
    }finally{
      setIsLoading(false)
    }
  }, [])

  const onSubmitProductos = useCallback( async (factura: Omit<ProductEntity, 'id'>) => {
  try {
    setIsLoading(true)
    const response = await getFetchWithCancel('/productos', "POST", factura )

   return response
  } catch (err) {
    setError(err instanceof Error ? err.message : "Error al crear producto")
  }finally{
    setIsLoading(false)
  }
  }, [])

  useEffect(() => {
    getProductos()
  }, [getProductos])

  return (
    <ProductoContext.Provider value={{productos, onSubmitProductos, isLoading, errors}}>
      {children}
    </ProductoContext.Provider>
  )
}

export const useProductos = () => {
  const context = useContext(ProductoContext)
  if (!context) {
    throw new Error('useFactura must be used within a FacturaProvider')
  }
  return context
}
/* eslint-disable react/react-in-jsx-scope */
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getFetchWithCancel } from "../../hooks/use-fetch-cancel";
import { CategoryEntity } from '../types/producto.entity';

interface FacturaContext {
  categoryProductos : CategoryEntity[]
  onSubmitCategory : (category: CategoryEntity) => void;
}

const ProductoContext = createContext<FacturaContext | undefined>(undefined);

export const ProductoProvider = ({children}: {children: ReactNode}) => {
  const [categoryProductos, setCategoryProductos] = useState<CategoryEntity[]>([])

  const onSubmitCategory = async (category: CategoryEntity) => {
  const response = await getFetchWithCancel('/categorias', "POST", {category} )
  return response
  }

  const getCategoryProductos = async () => {
    const response = await getFetchWithCancel<CategoryEntity[]>('/categorias', "GET")
    if(response === undefined) return []
    setCategoryProductos(response)
  }

  useEffect(() => {
    getCategoryProductos()
  }, [onSubmitCategory])

  return (
    <ProductoContext.Provider value={{onSubmitCategory, categoryProductos}}>
      {children}
    </ProductoContext.Provider>
  )
}

export const useFactura = () => {
  const context = useContext(ProductoContext)
  if (!context) {
    throw new Error('useFactura must be used within a FacturaProvider')
  }
  return context
}
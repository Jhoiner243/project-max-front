/* eslint-disable react/react-in-jsx-scope */
import { createContext, ReactNode, useContext, useReducer } from "react";
import { getFetchWithCancel } from "../../hooks/use-fetch-cancel";
import { FacturaAction, facturaReducer, initialValues } from "../hooks/use-factura";
import { DetallesFacturasEntity, type FacturasEntity } from '../types/factura.types';

interface FacturaContext {
  getFacturas : () => Promise<FacturasEntity[]>;
  onSubmitFactura : (factura: FacturasEntity) => void;
  factura: FacturasEntity
  clienteAdd: (id_cliente: string) => void;
  addProducto: (detalles: DetallesFacturasEntity) => void
  removeProducto: (idProducto: string) => void;
  clearFactura: () => void;
}

const FacturaContext = createContext<FacturaContext | undefined>(undefined);

export const FacturaProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(facturaReducer, initialValues);

    const clienteAdd = (id_cliente: string) => {
      dispatch({type: FacturaAction.ADD_CLIENT, payload: { id_cliente }})
    }

    const addProducto = (detalles: DetallesFacturasEntity) => {
      dispatch({ type: FacturaAction.ADD_PRODUCT, payload: detalles });
    };

    const removeProducto = (idProducto: string) => {
      dispatch({ type: FacturaAction.REMOVE_PRODUCT, payload: { idProducto } });
    };
  
    const clearFactura = () => {
      dispatch({ type: FacturaAction.CLEAR_INVOICE });
    };


  const getFacturas = async () => {
    const response = await getFetchWithCancel<FacturasEntity[]>('/facturas', "GET")
    if(response === undefined) return []
    return response
  }

  const onSubmitFactura = async () => {
  const response = await getFetchWithCancel('/facturas', "POST", {state} )
  return response
  }

  return (
    <FacturaContext.Provider value={{
      getFacturas,
      onSubmitFactura,
      factura: state,
      addProducto,
      clearFactura,
      clienteAdd,
      removeProducto,
      }}>
      {children}
    </FacturaContext.Provider>
  )
}

export const useFactura = () => {
  const context = useContext(FacturaContext)
  if (!context) {
    throw new Error('useFactura must be used within a FacturaProvider')
  }
  return context
}
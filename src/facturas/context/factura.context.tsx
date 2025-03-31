/* eslint-disable react/react-in-jsx-scope */
 
 
import { createContext, ReactNode, useContext, useReducer } from "react";
import { getFetchWithCancel } from "../../hooks/use-fetch-cancel";
import { SonnerToast } from "../../utils/sonner-toast";
import { FacturaAction, facturaReducer, initialValues } from "../hooks/use-factura";
import { DetallesFacturasEntity, type FacturasEntity } from "../types/factura.types";

interface FacturaContext {
  getFacturas: () => Promise<FacturasEntity[]>;
  onSubmitFactura: () => Promise<void>;
  factura: FacturasEntity;
  addClient: (id_cliente: string) => void;
  addProducto: (detalles: DetallesFacturasEntity) => void;
  removeProducto: (idProducto: string) => void;
  clearFactura: () => void;
  deleteProduct: (id_producto: string) => void;
  clearInvoice: () => void;
}

const FacturaContext = createContext<FacturaContext | undefined>(undefined);

export const FacturaProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(facturaReducer, initialValues);

  const clienteAdd = (id_cliente: string) => {
    dispatch({ type: FacturaAction.ADD_CLIENT, payload: { id_cliente } });
  };

  const addProducto = (detalles: DetallesFacturasEntity) => {
    dispatch({ type: FacturaAction.ADD_PRODUCT, payload: detalles });
  };

  const removeProducto = (idProducto: string) => {
    dispatch({ type: FacturaAction.REMOVE_PRODUCT, payload: { idProducto } });
  };

  const clearFactura = () => {
    dispatch({ type: FacturaAction.CLEAR_INVOICE });
  };

  const clearInvoice = () => {
    clearFactura();
  };

  const deleteProduct = (id_producto: string) => {
    if (id_producto) {
      removeProducto(id_producto);
    }
  };

  const addClient = (id_cliente: string) => {
    console.log("Cliente agregado:", id_cliente);
    clienteAdd(id_cliente);
  };

  const getFacturas = async () => {
    const response = await getFetchWithCancel<FacturasEntity[]>("/facturas", "GET");
    return response || [];
  };

  const onSubmitFactura = async () => {
    // Validar que el cliente esté asignado
    if (!state.id_cliente) {
      console.error("Error: Se requiere un cliente para la factura.");
      return;
    }
    // Validar que se hayan agregado productos
    if (!state.detalles || state.detalles.length === 0) {
      console.error("Error: La factura debe tener al menos un producto.");
      return;
    }

    // Preparar la factura con todos los campos requeridos
    const invoiceToSend: FacturasEntity = { ...state };

    try {
      await getFetchWithCancel("/factura", "POST", invoiceToSend);
      SonnerToast({
        title: "Factura creada correctamente",
        description: "Puedes revisar factura enviada al cliente",
        style: {backgroundColor: 'transparent', }
      });
    } catch (error) {
      console.error("Error al enviar factura:", error);
      SonnerToast({
        title: "Error",
        description: "No se pudo crear la factura",
        style: { color: "red", backgroundColor: 'transparent' }
      });
    }
  };

  return (
    <FacturaContext.Provider
      value={{
        deleteProduct,
        clearInvoice,
        getFacturas,
        onSubmitFactura,
        factura: state,
        addProducto,
        clearFactura,
        addClient,
        removeProducto,
      }}
    >
      {children}
    </FacturaContext.Provider>
  );
};

export const useFactura = () => {
  const context = useContext(FacturaContext);
  if (!context) {
    throw new Error("useFactura must be used within a FacturaProvider");
  }
  return context;
};

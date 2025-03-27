/* eslint-disable react/react-in-jsx-scope */
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { getFetchWithCancel } from "../../hooks/use-fetch-cancel";
import { type ClientEntity } from '../types/client.types';

interface ClientContext {
  clients: ClientEntity[];
  isLoading: boolean;
  error: string | null;
  createClient: (client: Omit<ClientEntity, 'id'>) => Promise<void>;
}

const ClientContext = createContext<ClientContext | undefined>(undefined);

export const ClientsProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<ClientEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getFetchWithCancel<ClientEntity[]>('/clientes', "GET");
      if (data) setClients(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching clients');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createClient = useCallback(async (newClient: Omit<ClientEntity, 'id'>) => {
    try {
      setIsLoading(true);
      const createdClient = await getFetchWithCancel<ClientEntity>(
        '/clientes',
        'POST',
        newClient
      );

      if (createdClient) {
        setClients(prev => [...prev, createdClient]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating client');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
   fetchClients();
  }, [fetchClients]);

  return (
    <ClientContext.Provider value={{ clients, isLoading, error, createClient }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClients must be used within a ClientsProvider');
  }
  return context;
};
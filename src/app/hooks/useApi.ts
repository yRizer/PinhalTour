import { useEffect, useState } from 'react';
import apiService from '../services/apiService';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useQRData(qrCode: string | string[]) {
  const [state, setState] = useState<ApiState<any>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!qrCode) {
      setState({
        data: null,
        loading: false,
        error: 'QR Code não fornecido',
      });
      return;
    }

    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        const qrCodeString = Array.isArray(qrCode) ? qrCode[0] : qrCode;
        
        console.log('🔍 Iniciando busca para QR Code:', qrCodeString);
        
        const response = await apiService.getQRInfo(qrCodeString);
        
        console.log('✅ Dados recebidos com sucesso:', response);
        
        setState({
          data: response,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('❌ Erro ao buscar dados do QR Code:', error);
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        setState({
          data: null,
          loading: false,
          error: `Falha na conexão: ${errorMessage}`,
        });
      }
    };

    fetchData();
  }, [qrCode]);

  return state;
}

export function useApi<T>(endpoint: string) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const response = await apiService.get(endpoint);
        setState({
          data: response,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Erro na chamada da API:', error);
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Erro desconhecido',
        });
      }
    };

    fetchData();
  }, [endpoint]);

  const refetch = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await apiService.get(endpoint);
      setState({
        data: response,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Erro na chamada da API:', error);
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  };

  return { ...state, refetch };
}
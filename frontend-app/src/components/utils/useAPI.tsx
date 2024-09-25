import axios from 'axios';
import { Auth0Context } from '@auth0/auth0-react';
import { useContext, useState } from 'react';

const useApi = () => {
  const { getAccessTokenSilently } = useContext(Auth0Context);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const apiCall = async (path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data: any = null) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const token = await getAccessTokenSilently();
      const url = `${API_BASE_URL}${path}`; 
      const result = await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data,
      });

      setResponse(result.data);
      return result.data;
    } catch (error) {
      // Type assertion for AxiosError
      if (axios.isAxiosError(error)) {
        setError(error.message || 'An error occurred');
      } else {
        setError('An unknown error occurred');
      }
      console.error('API call failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const create = (path: string, data: any) => apiCall(path, 'POST', data);
  const read = (path: string) => apiCall(path, 'GET');
  const update = (path: string, data: any) => apiCall(path, 'PUT', data);
  const del = (path: string) => apiCall(path, 'DELETE');

  return { create, read, update, del, loading, response, error };
};

export default useApi;

import { useState, useEffect } from 'react';
import { AxiosError } from "axios";

export const useArnold = ((caching: {[key: string]: unknown}) => 
  <T>(
    key: string, 
    fetchAPI: (...args: any[]) => Promise<any>
  ) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AxiosError | null>(null);
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
      setIsLoading(true);
      (async () => {
        try {
          const response = caching[key] ? caching[key] : await fetchAPI();
          
          caching[key] = response.data;
          setData(response.data);
        } catch (e) {
          if (e instanceof AxiosError) {
            setError(e);
          }
        } finally {
          setIsLoading(false);
        }
      })();
    }, []);

    return { isLoading, data, error };
})({});

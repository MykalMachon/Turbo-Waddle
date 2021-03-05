import { useEffect } from 'preact/hooks';
import { useQuery } from 'react-query';
import useSupabase from '../supabase/useSupabase';

const AuthWrapper = ({ children }) => {
  const supabase = useSupabase();
  const { data, isLoading } = useQuery(
    'authState',
    () => {
      return supabase.auth.user();
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      refetchInterval: 1000 * 30,
      retry: 10,
      retryDelay: 500,
    }
  );
  if (isLoading) return null;
  return <>{children}</>;
};

export default AuthWrapper;

import { SupabaseClient } from '@supabase/supabase-js';
import { useContext } from 'preact/hooks';
import { SupabaseContext } from './Supabase';

const useSupabase = (): SupabaseClient => {
  const supabase = useContext(SupabaseContext);
  return supabase.client;
};

export default useSupabase;

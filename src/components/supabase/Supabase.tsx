import { SupabaseClient } from '@supabase/supabase-js';
import { createContext, FunctionComponent } from 'preact';
import { supabase } from '/@utils/supabase';

export const SupabaseContext = createContext({
  client: supabase,
});

const SupabaseProvider: FunctionComponent<any> = ({ children }) => {
  return (
    <SupabaseContext.Provider value={{ client: supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export default SupabaseProvider;

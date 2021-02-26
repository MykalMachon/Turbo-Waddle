import { useEffect, useState } from 'preact/hooks';
import { supabase } from './utils/supabase';
import 'preact/debug';
import { User, UserCredentials } from '@supabase/supabase-js';
import UserCard from './components/sidebar/UserCard';
import Feed from './components/Feed';

export function App() {
  const [userInfo, setUserInfo] = useState<User | null>(() => {
    return supabase.auth.user();
  });

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('auth state changed');
      setUserInfo(supabase.auth.user());
    });
  }, []);

  const signup = async (event) => {
    event.preventDefault();
    const signupData: UserCredentials = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    const { user, session, error } = await supabase.auth.signUp(signupData);
    console.log(user);
  };

  return (
    <>
      <div className="appLayout">
        <UserCard />
        <Feed />
      </div>
    </>
  );
}

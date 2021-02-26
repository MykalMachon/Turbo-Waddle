import SignupForm from '../forms/SignupForm';
import SigninForm from '../forms/SigninForm';

import { useState, useEffect } from 'preact/hooks';

import { supabase } from '../../utils/supabase';
import { User } from '@supabase/supabase-js';

const UserCard = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('auth state changed');
      setUserInfo(supabase.auth.user());
    });
  }, []);

  const signOut = () => {
    supabase.auth.signOut();
  };

  return (
    <aside className="userCard">
      {userInfo ? (
        <>
          <p>You're logged in</p>
          <p className="username">{userInfo.email}</p>
          <button onClick={signOut}>Signout</button>
        </>
      ) : (
        <>
          <details>
            <summary>Sign Up</summary>
            <SignupForm />
          </details>
          <details>
            <summary>Sign In</summary>
            <SigninForm />
          </details>
        </>
      )}
    </aside>
  );
};

export default UserCard;

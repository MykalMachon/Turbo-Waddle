import SignupForm from '/@components/forms/SignupForm';
import SigninForm from '/@components/forms/SigninForm';

import { supabase } from '/@utils/supabase';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const UserCard = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery(
    'authState',
    () => supabase.auth.user(),
    { refetchOnMount: true, refetchOnWindowFocus: true, refetchInterval: 5000 }
  );

  const signOut = async () => {
    return await supabase.auth.signOut();
  };

  const mutateAuth = useMutation(signOut, {
    onSuccess: () => {
      queryClient.invalidateQueries('authState');
    },
  });

  return (
    <aside className="userCard">
      {data ? (
        <>
          <p>You're logged in</p>
          <p className="username">{data.email}</p>
          <button
            onClick={() => {
              mutateAuth.mutate();
            }}
          >
            Signout
          </button>
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

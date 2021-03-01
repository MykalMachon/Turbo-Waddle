import { useMutation, useQuery, useQueryClient } from 'react-query';
import { supabase } from '/@utils/supabase';
import SignupForm from '/@components/forms/SignupForm';
import SigninForm from '/@components/forms/SigninForm';

const UserCard = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery('authState');

  const signOut = async () => {
    return await supabase.auth.signOut();
  };

  const mutateAuth = useMutation(signOut, {
    onSuccess: () => {
      queryClient.invalidateQueries('authState');
    },
  });

  return (
    <>
      {data ? (
        <div className="card">
          <p>You're logged in</p>
          <p className="username">{data.email}</p>
          <button
            onClick={() => {
              mutateAuth.mutate();
            }}
          >
            Signout
          </button>
        </div>
      ) : (
        <div className="card">
          <details>
            <summary>Sign Up</summary>
            <SignupForm />
          </details>
          <details>
            <summary>Sign In</summary>
            <SigninForm />
          </details>
        </div>
      )}
    </>
  );
};

export default UserCard;

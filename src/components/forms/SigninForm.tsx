import { UserCredentials } from '@supabase/supabase-js';
import { useQueryClient } from 'react-query';
import { supabase } from '/@utils/supabase';

const SigninForm = () => {
  const queryClient = useQueryClient();
  const signin = async (event) => {
    event.preventDefault();
    const signinData: UserCredentials = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    await supabase.auth.signIn(signinData);
    queryClient.invalidateQueries('authState');
  };

  return (
    <div className="authForm">
      <form onSubmit={signin}>
        <label className="authForm__input" htmlFor="email">
          Email
          <input type="email" name="email" id="email" />
        </label>
        <label className="authForm__input" htmlFor="password">
          Password
          <input type="password" name="password" id="password" />
        </label>
        <input type="submit" value="Sign In" />
      </form>
    </div>
  );
};

export default SigninForm;

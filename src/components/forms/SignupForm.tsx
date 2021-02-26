import { UserCredentials } from '@supabase/supabase-js';
import { supabase } from '/@utils/supabase';

const LoginForm = () => {
  const signUp = async (event) => {
    event.preventDefault();
    const signUpData: UserCredentials = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    const { user, session, error } = await supabase.auth.signUp(signUpData);
  };

  return (
    <div className="authForm">
      <form onSubmit={signUp}>
        <label className="authForm__input" htmlFor="email">
          Email
          <input type="email" name="email" id="email" />
        </label>
        <label className="authForm__input" htmlFor="password">
          Password
          <input type="password" name="password" id="password" />
        </label>
        <input type="submit" value="Sign Up" />
        <p>After your signup, check your email for an invite link 😀</p>
      </form>
    </div>
  );
};

export default LoginForm;

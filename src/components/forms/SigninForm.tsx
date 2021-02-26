import { UserCredentials } from '@supabase/supabase-js';
import { supabase } from '../../utils/supabase';

const SigninForm = () => {
  const signin = async (event) => {
    event.preventDefault();
    const signinData: UserCredentials = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    const { user, session, error } = await supabase.auth.signIn(signinData);
    console.log(user);
    console.log(session);
    console.log(error);
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

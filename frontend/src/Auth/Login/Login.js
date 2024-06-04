import React from 'react';
import { css } from 'aphrodite';
import { signStyles } from '../../styles/authStyles';
import { withNavigate } from '../../HOC/withNavigate';

const Login = (props) => {
  const handleProfile = (role) => role === "business" ? props.navigate('/profile/admin') : props.navigate('/profile/client');

  return (
    <div className={css(signStyles.signUpBody)}>
      <form className={css(signStyles.form)} onSubmit={() => handleProfile( 'business')}>
        <h1>LOGIN</h1>
        <div>
          <label htmlFor="email"></label>
          <input type="email" name="email" id="email" autoComplete="true" placeholder="Email" className={css(signStyles.input)} />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input type="password" name="password" id="password" autoComplete="true" placeholder="Password" className={css(signStyles.input)} />
        </div>
        <input type="submit" value="LOGIN" className={css(signStyles.button)}/>
        <a href="#" className={css(signStyles.aLinks)}>Forgot Password</a>
        <p><strong> No account?
          <span className={css(signStyles.text)} onClick={props.toggleSignup}>Sign Up</span>
        </strong></p>
      </form>
    </div>
  );
}

export default withNavigate(Login);

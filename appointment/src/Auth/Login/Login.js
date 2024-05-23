import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { signStyles } from '../../styles/authStyles';

class Login extends React.Component {
  render() {
    return (
      <div className={css(signStyles.signUpBody)}>
        <form className={css(signStyles.form)}>
          <h1>LOGIN</h1>
          <div>
            <label htmlFor="email"></label>
            <input type="email" name="email" id="email" autoComplete="true" placeholder="Email" className={css(signStyles.input)} />
          </div>
          <div>
            <label htmlFor="password"></label>
            <input type="password" name="password" id="password" autoComplete="true" placeholder="Password" className={css(signStyles.input)} />
          </div>
          <input type="submit" value="SIGN UP" className={css(signStyles.button)} />
          <a href="#" className={css(signStyles.aLinks)}>Forgot Password</a>
          <p><strong> No account? <span className={css(signStyles.text)} onClick={this.props.toggleSignup}>Sign Up</span></strong></p>
        </form>
      </div>
    );
  }
}

export default Login;

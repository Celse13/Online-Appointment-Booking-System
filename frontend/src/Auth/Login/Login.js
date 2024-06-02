import React from 'react';
import { css } from 'aphrodite';
import { signStyles } from '../../styles/authStyles';
import { withNavigate } from '../../HOC/withNavigate';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  handleProfile = (role) => {
    role === "business" ? this.props.navigate('/profile/admin') : this.props.navigate('/profile/client');
  }

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
          <input type="submit" value="LOGIN" className={css(signStyles.button)} onClick={() => handleProfile('business')}/>
          <a href="#" className={css(signStyles.aLinks)}>Forgot Password</a>
          <p><strong> No account?
            <span className={css(signStyles.text)} onClick={this.props.toggleSignup}>Sign Up</span>
          </strong></p>
        </form>
      </div>
    );
  }
}

export default withNavigate(Login);

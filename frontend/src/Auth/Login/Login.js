import React from 'react';
import { css } from 'aphrodite';
import { signStyles } from '../../styles/authStyles';
import { withNavigate } from '../../HOC/withNavigate';
import axios from 'axios';
import AuthApi from '../../Api/Services/handleAuthApi';


const Login = (props) => {
  const handleProfile = async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = {
      email,
      password
    }
    console.log(user);
    try {
      const response = await AuthApi.login(user);
      
      // Getting the token from response
      const token = response.token;
      localStorage.setItem('token', token);

      user.role === "business" ? props.navigate('/profile/admin') : props.navigate('/profile/client');
    } catch (error) {
      console.error(error);
    }
  }

  return (
      <div className={css(signStyles.signUpBody)}>
          <form className={css(signStyles.form)} onSubmit={handleProfile}>
              <h1>LOGIN</h1>
              <div>
                  <label htmlFor="email"></label>
                  <input type="email" name="email" id="email" autoComplete="true" placeholder="Email"
                         className={css(signStyles.input)} required/>
              </div>
              <div>
                  <label htmlFor="password"></label>
                  <input type="password" name="password" id="password" autoComplete="true" placeholder="Password"
                         className={css(signStyles.input)} required/>
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

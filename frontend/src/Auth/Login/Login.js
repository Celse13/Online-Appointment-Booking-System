import React, { useState } from 'react';
import { css } from 'aphrodite';
import { signStyles } from '../../styles/authStyles';
import { withNavigate } from '../../HOC/withNavigate';
import AuthApi from '../../Api/Services/handleAuthApi';
import { Lock, Mail } from 'lucide-react';
import { servicesListStyles } from '../../styles/profCompStyles';
import { handleLoginChange } from '../../utils/utils';


const Login = (props) => {
  const initializeFormData = {
    email: '',
    password: ''
  }
  const [errorMessages, setErrorMessages] = useState({ ...initializeFormData });
  const [formData, setFormData] = useState({ ...initializeFormData });

  const handleProfile = async (event) => {
    event.preventDefault();
    const hasErrors = Object.values(errorMessages).some(msg => msg !== '');

    if (hasErrors) {
      alert('Please fix the errors in the form before submitting.');
      return;
    }
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
      alert('Error logging in user. Try again later!');
      console.error(error);
    }
  }

  return (
    <div className={css(signStyles.signUpBody)}>
      <form className={css(signStyles.form)} onSubmit={handleProfile}>
        <h1>LOGIN</h1>
        <div>
          <span><Mail />
            <input type="email" name="email" id="email" autoComplete="true" placeholder="Email"
                 className={css(signStyles.input)} required onChange={(e) => handleLoginChange(e, formData, setFormData, setErrorMessages)}/>
          </span>
          {errorMessages.email && (
            <div className={css(servicesListStyles.error)}>
              {errorMessages.email}
            </div>
          )}
        </div>
        <div>
          <span><Lock />
            <input type="password" name="password" id="password" autoComplete="true" placeholder="Password"
                 className={css(signStyles.input)} required onChange={(e) => handleLoginChange(e, formData, setFormData, setErrorMessages)}/>
          </span>
          {errorMessages.password && (
            <div className={css(servicesListStyles.error)}>
              {errorMessages.password}
            </div>
          )}
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

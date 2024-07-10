import React, { useState } from 'react';
import { css } from 'aphrodite';
import { signStyles } from '../../styles/authStyles';
import { withNavigate } from '../../HOC/withNavigate';
import AuthApi from '../../Api/Services/handleAuthApi';
import { Lock, Mail } from 'lucide-react';
import { servicesListStyles } from '../../styles/profCompStyles';
import { jwtDecode } from 'jwt-decode';


const Login = (props) => {
  const initializeFormData = { email: '', password: '', form: 'Login with a verified account'}
  const [errorMessages, setErrorMessages] = useState({ ...initializeFormData });
  const [formData, setFormData] = useState({ ...initializeFormData });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setErrorMessages({ ...errorMessages, email: '', password: '', form: ''});
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleProfile = async (event) => {
    event.preventDefault();

    const hasErrors = Object.values(errorMessages).some(msg => msg !== '');
    if (hasErrors) {
      setErrorMessages({ ...errorMessages, form: 'Please fix the errors in the form before submitting.'});
      return;
    }

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const user = { email, password }

    try {
      const response = await AuthApi.login(user);
      const token = response.token;
      localStorage.setItem('token', token);
			const decoded = jwtDecode(token);
			const role = decoded.role;
      role === "business" && props.navigate('/profile/admin');
      role === "staff" && props.navigate('/profile/staff');
      role === "client" && props.navigate('/profile/client');

    } catch (error) {
      console.error(error)
      setErrorMessages({ ...errorMessages, form: 'Invalid email or password!' });
    }
  }

  return (
    <div className={css(signStyles.signUpBody)}>
      <form className={css(signStyles.form)} onSubmit={handleProfile}>
        <h1>LOGIN</h1>
        <div>
          <span><Mail />
            <input type="email" name="email" id="email" autoComplete="true" placeholder="Email"
                 className={css(signStyles.input)} required onChange={handleLoginChange}/>
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
                 className={css(signStyles.input)} required onChange={handleLoginChange}/>
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
        {errorMessages.form && (
          <div className={css(servicesListStyles.error)}>
            {errorMessages.form}
          </div>
        )}
      </form>
    </div>
  );
}

export default withNavigate(Login);

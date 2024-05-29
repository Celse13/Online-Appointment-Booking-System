import React, { useState } from 'react';
import { css } from 'aphrodite';
import { signStyles } from '../../styles/authStyles';
import { withNavigate } from '../../HOC/withNavigate';
import { Switch } from '../Switch';

const Signup = (props) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleProfile = (event) => {
    event.preventDefault();
    const role = document.getElementById('role').value;
    if (role === "1") {
      props.navigate('/profile/admin');
    } else {
      props.navigate('/profile/client');
    }
  }


  return (
    <div className={css(signStyles.signUpBody)}>
      <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/>
      <form className={css(signStyles.form)}>
        <h1>SIGN UP</h1>
        <div>
          <label htmlFor="name"></label>
          <input type="text" name="name" id="name" autoComplete="true" placeholder="Name"
                 className={css(signStyles.input)} />
        </div>
        <div>
          <label htmlFor="email"></label>
          <input type="email" name="email" id="email" autoComplete="true" placeholder="Email"
                 className={css(signStyles.input)} />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input type="password" name="password" id="password" autoComplete="true"
                 placeholder="Password" className={css(signStyles.input)} />
        </div>
        <div>
          <label htmlFor="confirmPassword"></label>
          <input type="password" name="confirmPassword" id="confirmPassword" autoComplete="true"
                 placeholder="Confirm Password" className={css(signStyles.input)} />
        </div>
        <div>
          <label htmlFor="role"></label>
          <select name="role" id="role" className={css(signStyles.input)}>
            {isToggled ? (
              <option value="1" role="biz">Business</option>
            ) : (
              <option value="2" role='client'>Client</option>
              )}
          </select>
        </div>
        <input type="submit" value="SIGN UP" className={css(signStyles.button)}
               onClick={handleProfile} />
        <p><strong> Already have an account?
          <span className={css(signStyles.text)} onClick={props.toggleLogin}>Login</span>
        </strong></p>
      </form>
    </div>
  );
}

export default withNavigate(Signup);


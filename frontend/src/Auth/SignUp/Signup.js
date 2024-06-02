import React, { useState } from 'react';
import { css } from 'aphrodite';
import { signStyles } from '../../styles/authStyles';
import { withNavigate } from '../../HOC/withNavigate';
import { Switch } from '../Switch';
import { Lock, Mail, UserRound, UserRoundCog } from 'lucide-react';

const Signup = (props) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleProfile = (event) => {
    event.preventDefault();
    const role = document.getElementById('role').value;
    role === "Business" ? props.navigate('/profile/admin') : props.navigate('/profile/client');
  }

  return (
    <div className={css(signStyles.signUpBody)}>
      <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/>
      <form onSubmit={handleProfile} className={css(signStyles.form)}>
        <h1>SIGN UP</h1>
        <div>
          <span><UserRound />
            <input type="text" name="name" id="name" autoComplete="true" placeholder="Name"
                 className={css(signStyles.input)} required/>
          </span>
        </div>
        <div>
          <span><Mail />
            <input type="email" name="email" id="email" autoComplete="true" placeholder="Email"
                 className={css(signStyles.input)} required/>
          </span>
        </div>
        <div>
          <span><Lock />
            <input type="password" name="password" id="password" autoComplete="true"
                 placeholder="Password" className={css(signStyles.input)} required/>
          </span>
        </div>
        <div>
          <span><Lock />
            <input type="password" name="confirmPassword" id="confirmPassword" autoComplete="true"
                 placeholder="Confirm Password" className={css(signStyles.input)} required/>
          </span>
        </div>
        <div>
          <span><UserRoundCog />
            <input type="text" name="role" id="role" value={isToggled ? 'Business' : 'Client'}
              className={css(signStyles.input)} readOnly/>
          </span>
        </div>
        {isToggled && (
          <textarea name="description" id="description" placeholder="Business Description"
                    className={css(signStyles.input)} />
        )}
        <input type="submit" value="SIGN UP" className={css(signStyles.button)}/>
        <p><strong> Already have an account?
          <span className={css(signStyles.text)} onClick={props.toggleLogin}>Login</span>
        </strong></p>
      </form>
    </div>
  );
}

export default withNavigate(Signup);


import React, { useState } from 'react';
import { css } from 'aphrodite';
import { signStyles } from '../../styles/authStyles';
import { withNavigate } from '../../HOC/withNavigate';
import { Switch } from '../Switch';
import { Lock, Mail, Phone, Pin, UserRound, UserRoundCog } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import axios from 'axios';


const Signup = (props) => {
  const [isToggled, setIsToggled] = useState(false);
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');


  const BASE_URL = 'http://localhost:5500/api/auth/signup'

  const handleProfile = async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = isToggled ? 'business' : 'client';
    const phone = isToggled ? phone : null;
    const location = isToggled ? location : null;
    const description = isToggled ? document.getElementById('description').value : null;


    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }


    let user = {
      name: name,
      email: email,
      password: password,
      role: role
    };


    if (role === 'business') {
      user.phone = phone;
      user.location = location;
      user.description = description;
    }


    try {
      const response = await axios.post(BASE_URL, user);
      console.log(response.data);
      role === "business" ? props.navigate('/profile/admin') : props.navigate('/profile/client');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={css(signStyles.signUpBody)}>
      <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
      <form onSubmit={handleProfile} className={css(signStyles.form)}>
        <h1>SIGN UP</h1>
        <div>
          <span><UserRound />
            <input type="text" name="name" id="name" autoComplete="true" placeholder="Name"
              className={css(signStyles.input)} required />
          </span>
        </div>
        <div>
          <span><Mail />
            <input type="email" name="email" id="email" autoComplete="true" placeholder="Email"
              className={css(signStyles.input)} required />
          </span>
        </div>
        <div>
          <span><Lock />
            <input type="password" name="password" id="password" autoComplete="true"
              placeholder="Password" className={css(signStyles.input)} required />
          </span>
        </div>
        <div>
          <span><Lock />
            <input type="password" name="confirmPassword" id="confirmPassword" autoComplete="true"
              placeholder="Confirm Password" className={css(signStyles.input)} required />
          </span>
        </div>
        <div>
          <span><UserRoundCog />
            <input type="text" name="role" id="role" value={isToggled ? 'business' : 'client'}
              className={css(signStyles.input)} readOnly />
          </span>
        </div>
        {isToggled && (
          <div>
            <span><Phone />
              <PhoneInput country={'ke'} value={phone} onChange={phone => setPhone(phone)}
                inputStyle={{ width: '100%' }}
                className={css(signStyles.input)} />
            </span>
            <span><Pin />
              <input type="text" name="location" id="location" autoComplete="true"
                placeholder="Location"
                className={css(signStyles.input)} value={location}
                onChange={(e) => setLocation(e.target.value)} required />
            </span>
            <textarea name="description" id="description" placeholder="Business Description"
              className={css(signStyles.input)} />
          </div>
        )}
        <input type="submit" value="SIGN UP" className={css(signStyles.button)} />
        <p><strong> Already have an account?
          <span className={css(signStyles.text)} onClick={props.toggleLogin}>Login</span>
        </strong></p>
      </form>
    </div>
  );
}

export default withNavigate(Signup);

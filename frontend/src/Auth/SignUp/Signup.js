import React, { Fragment, useState } from 'react';
import { css } from 'aphrodite';
import { signStyles } from '../../styles/authStyles';
import { withNavigate } from '../../HOC/withNavigate';
import { Switch } from '../Switch';
import { Lock, Mail, Phone, Pin, UserRound, UserRoundCog, XCircle } from 'lucide-react';
import { servicesListStyles } from '../../styles/profCompStyles';
import { handleChange } from '../../utils/utils';
import AuthApi from '../../Api/handleAuthApi';
import { Button, Card } from 'react-bootstrap';

const Signup = (props) => {
  const [isToggled, setIsToggled] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const initializeFormData = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [errorMessages, setErrorMessages] = useState({
    ...initializeFormData,
    phone: '',
    description: ''
  });

  const [formData, setFormData] = useState({
    ...initializeFormData,
    role: '',
    phone: isToggled ? '' : null,
    location: isToggled ? '' : null,
    description: isToggled ? '' : null
  });

  const handleProfile = async (event) => {
    event.preventDefault();
    const hasErrors = Object.values(errorMessages).some(msg => msg !== '');

    if (hasErrors) {
      alert('Please fix the errors in the form before submitting.');
      return;
    }

    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = isToggled ? 'business' : 'client';
    const phone = isToggled ? document.getElementById('phone').value : null;
    const location = isToggled ? document.getElementById('location').value : null;
    const description = isToggled ? document.getElementById('description').value : null;

    let user = {
      name: name,
      lastName: lastName,
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
      await AuthApi.signup(user);
      setShowVerification(true);
    } catch (error) {
      alert('Error creating user. Try again later!');
      console.error(error);
    }
  }

  const handleProceed = () => {
    {/*
      const role = isToggled ? 'business' : 'client';
      const path = role === 'business' ? '/profile/admin' : '/profile/client';
      props.navigate(path);
      window.location.reload();
    */}
    const path = props.toggleLogin;
    props.navigate(path);
    window.location.reload();
  }

  return (
    <Fragment>
      <div className={css(signStyles.signUpBody)}>
        <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
        <form onSubmit={handleProfile} className={css(signStyles.form)}>
          <h1>SIGN UP</h1>
          <div>
          <span><UserRound />
            <input type="text" name="name" id="name" autoComplete="true" placeholder="Name"
                   className={css(signStyles.input)} required
                   onChange={(e) => handleChange(e, formData, setFormData, setErrorMessages)} />
          </span>
            {errorMessages.name && (
              <div className={css(servicesListStyles.error)}>
                {errorMessages.name}
              </div>
            )}
          </div>
          <div>
          <span><UserRound />
            <input type="text" name="lastName" id="lastName" autoComplete="true"
                   placeholder="Last name"
                   className={css(signStyles.input)} required
                   onChange={(e) => handleChange(e, formData, setFormData, setErrorMessages)} />
          </span>
            {errorMessages.lastName && (
              <div className={css(servicesListStyles.error)}>
                {errorMessages.lastName}
              </div>
            )}
          </div>
          <div>
          <span><Mail />
            <input type="email" name="email" id="email" autoComplete="true" placeholder="Email"
                   className={css(signStyles.input)} required
                   onChange={(e) => handleChange(e, formData, setFormData, setErrorMessages)} />
          </span>
            {errorMessages.email && (
              <div className={css(servicesListStyles.error)}>
                {errorMessages.email}
              </div>
            )}
          </div>
          <div>
          <span><Lock />
            <input type="password" name="password" id="password" autoComplete="true"
                   placeholder="Password" className={css(signStyles.input)} required
                   onChange={(e) => handleChange(e, formData, setFormData, setErrorMessages)} />
          </span>
            {errorMessages.password && (
              <div className={css(servicesListStyles.error)}>
                {errorMessages.password}
              </div>
            )}
          </div>
          <div>
          <span><Lock />
            <input type="password" name="confirmPassword" id="confirmPassword" autoComplete="true"
                   placeholder="Confirm Password" className={css(signStyles.input)} required
                   onChange={(e) => handleChange(e, formData, setFormData, setErrorMessages)} />
          </span>
            {errorMessages.confirmPassword && (
              <div className={css(servicesListStyles.error)}>
                {errorMessages.confirmPassword}
              </div>
            )}
          </div>
          <div>
          <span><UserRoundCog />
            <input type="text" name="role" id="role" value={isToggled ? 'business' : 'client'}
                   className={css(signStyles.input)} readOnly />
          </span>
          </div>
          {isToggled && (
            <div>
              <div>
              <span><Phone />
                <input type="tel" name="phone" id="phone"
                       autoComplete="true" placeholder="phone"
                       className={css(signStyles.input)} required
                       onChange={(e) => handleChange(e, formData, setFormData, setErrorMessages)} />
              </span>
                {errorMessages.phone && (
                  <div className={css(servicesListStyles.error)}>
                    {errorMessages.phone}
                  </div>
                )}
              </div>
              <div>
              <span><Pin />
              <input type="text" name="location" id="location" autoComplete="true"
                     placeholder="location"
                     className={css(signStyles.input)} required />
              </span>
              </div>
              <div>
              <textarea name="description" id="description" placeholder="Business Description"
                        className={css(signStyles.input)}
                        onChange={(e) => handleChange(e, formData, setFormData, setErrorMessages)} />
                {errorMessages.description && (
                  <div className={css(servicesListStyles.error)}>
                    {errorMessages.description}
                  </div>
                )}
              </div>
            </div>
          )}
          <input type="submit" value="SIGN UP" className={css(signStyles.button)} />
          <p><strong> Already have an account?
            <span className={css(signStyles.text)} onClick={props.toggleLogin}>Login</span>
          </strong></p>
        </form>
      </div>
      {showVerification && (
        <div className={css(signStyles.verificationDiv)}>
          <Card className={css(signStyles.verificationCard)}>
            <Card.Header className={css(signStyles.verificationCardHeader)}><XCircle
              className={css(signStyles.verificationCardHeaderClose)} /></Card.Header>
            <Card.Body>
              <Card.Title
                className={css(signStyles.verificationCardTitle)}>VERIFICATION</Card.Title>
              <Card.Text className={css(signStyles.verificationCardText)}>
                Account verification email has been sent to your email address: <br /><span
                className={css(signStyles.verificationEmailAddress)}> {formData.email}.</span><br /> Please
                verify your account to proceed.
              </Card.Text>
            </Card.Body>
            <Card.Footer className={css(signStyles.verificationCardFooter)}>
              <Button className={css(signStyles.button)} onClick={handleProceed}>PROCEED</Button>
            </Card.Footer>
          </Card>
        </div>
      )}
    </Fragment>
  );
}

export default withNavigate(Signup);

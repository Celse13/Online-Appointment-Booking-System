import React from 'react';
import Signup from './SignUp/Signup';
import { css } from 'aphrodite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { authStyles } from '../styles/authStyles';
import Login from './Login/Login';
import { withNavigate } from '../HOC/withNavigate';
import { handleBackHome } from '../utils/utils';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showLogin: true }
  }

  toggleForm = () => {
    this.setState(prevState => ({ showLogin: !prevState.showLogin }));
  }

  render() {
    const { navigate } = this.props;
    return (
      <div className={css(authStyles.auth)}>
        <div className={css(authStyles.back)} onClick={() => handleBackHome(navigate)}>
          <h3><FontAwesomeIcon icon={faArrowCircleLeft} className={css(authStyles.icon)} /> Go back home</h3>
        </div>
        {this.state.showLogin ? <Login toggleSignup={this.toggleForm} /> : <Signup toggleLogin={this.toggleForm} />}
      </div>
    )
  }
}

export default withNavigate(Auth);

import React, { Fragment } from 'react';
import { css } from 'aphrodite';
import { headerStyles } from '../../styles/landingStyles';
import icon from '../../Assets/icon.png';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <Fragment>
        <nav className={css(headerStyles.navBar)}>
          <Card className={css(headerStyles.navBarCard)}>
            <img src={icon} alt="" className={css(headerStyles.navBarIcon)} />
          </Card>
          <ul className={css(headerStyles.navBarList)}>
            <li><a href="#home" className={css(headerStyles.listItem)}>HOME</a></li>
            <li><Link to="/auth" className={css(headerStyles.listItem)}>LOGIN</Link></li>
            <li><a href="#services" className={css(headerStyles.listItem)}>SERVICES</a></li>
            <li><a href="#about" className={css(headerStyles.listItem)}>ABOUT</a></li>
            <li><a href="#testimonials" className={css(headerStyles.listItem)}>TESTIMONIALS</a></li>
            <li><a href="#footer" className={css(headerStyles.listItem)}>CONTACT</a></li>
          </ul>
        </nav>
      </Fragment>
    );
  }
}

export default Header;

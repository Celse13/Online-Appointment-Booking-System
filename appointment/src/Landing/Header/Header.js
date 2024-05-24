import React, { Fragment } from 'react';
import { css } from 'aphrodite';
import { headerStyles } from '../../styles/landingStyles';
import icon from '../../Assets/icon.png';
import { Card } from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <Fragment>
        <nav className={css(headerStyles.navBar)}>
          <Card className={css(headerStyles.navBarCard)}>
            <img src={icon} alt="" className={css(headerStyles.navBarIcon)} />
          </Card>
          <ul className={css(headerStyles.navBarList)}>
            <li><a href="#" className={css(headerStyles.listItem)}>HOME</a></li>
            <li><a href="#" className={css(headerStyles.listItem)}>LOGIN</a></li>
            <li><a href="#" className={css(headerStyles.listItem)}>SERVICES</a></li>
            <li><a href="#" className={css(headerStyles.listItem)}>ABOUT</a></li>
            <li><a href="#" className={css(headerStyles.listItem)}>TESTIMONIALS</a></li>
            <li><a href="#" className={css(headerStyles.listItem)}>CONTACT</a></li>
          </ul>
        </nav>
      </Fragment>
    );
  }
}

export default Header;

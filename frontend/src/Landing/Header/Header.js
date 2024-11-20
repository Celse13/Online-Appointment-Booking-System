import React, { Fragment, useState } from 'react';
import { css } from 'aphrodite';
import { headerStyles } from '../../styles/landingStyles';
import icon from '../../../public/images/icon.webp';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AlignJustify, X } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  let path = '/auth';
  let name = 'LOGIN';
  const token = localStorage.getItem('token');

  if (token) {
    name = 'PROFILE'
    const decoded = jwtDecode(token);
    const role = decoded.role;
    if (role === 'business') {
      path = '/profile/admin';
    } else if (role === 'staff') {
      path = '/profile/staff';
    } else {
      path = '/profile/client';
    }
  }

  return (
    <Fragment>
      <nav className={css(headerStyles.navBar)}>
        <Card className={css(headerStyles.navBarCard)}>
          <img src={icon} alt="" className={css(headerStyles.navBarIcon)} />
        </Card>
        <Card className={css(headerStyles.menuCard)} onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <AlignJustify size={28} />}
        </Card>
        <ul className={css(headerStyles.navBarList, menuOpen && headerStyles.navBarListOpen)}>
          <li><HashLink to="/#home" className={css(headerStyles.listItem)}>HOME</HashLink></li>
          <li><Link to={path} className={css(headerStyles.listItem)}>{name}</Link></li>
          <li><HashLink to='/#services' className={css(headerStyles.listItem)}>SERVICES</HashLink> </li>
          <li><HashLink to="/#about" className={css(headerStyles.listItem)}>ABOUT</HashLink></li>
          <li><HashLink to="/#testimonials" className={css(headerStyles.listItem)}>TESTIMONIALS</HashLink></li>
          <li><HashLink to="/#contacts" className={css(headerStyles.listItem)}>CONTACT</HashLink></li>
        </ul>
      </nav>
    </Fragment>
  );
}

export default Header;

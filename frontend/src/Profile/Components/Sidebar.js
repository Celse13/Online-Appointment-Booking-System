import React, { createContext, useContext, useState } from 'react';
import { LogOut, PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import { css } from 'aphrodite';
import logo from '../../Assets/logo.png';
import { sidebarStyles } from '../../styles/sidebarStyles';
import { withNavigate } from '../../HOC/withNavigate';
import { handleBackHome } from '../../utils/utils';
import { jwtDecode } from 'jwt-decode';

const SidebarContext = createContext(undefined);

const Sidebar = ({ children, onSelect, navigate }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState('Appointments');
  const handleItemClick = (item) => {
    setActiveItem(item);
    onSelect(item);
  }
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const email = decoded.email;
  const name = decoded.username;

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <aside className={css(sidebarStyles.container)}>
      <nav className={css(sidebarStyles.nav)}>
        <div className={css(sidebarStyles.header)}>
          <div className={css(expanded ? sidebarStyles.logoExpanded : sidebarStyles.logoCollapsed)}>
            <img src={logo} alt="" width="100px" />
          </div>
          <button onClick={() => setExpanded((curr) => !curr)} className={css(sidebarStyles.toggleButton)}>
            {expanded ? <PanelRightOpen /> : <PanelLeftOpen />}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded, activeItem, handleItemClick, }}>
          <ul className={css(sidebarStyles.menu)}>{children}</ul>
        </SidebarContext.Provider>
        <div className={css(sidebarStyles.footer)}>
          <img src="https://ui-avatars.com/api/?background=ffffff&color=986D8E&bold=true" alt="" className={css(sidebarStyles.avatar)} width="40px" height="40px" />
          <div className={css(expanded ? sidebarStyles.userInfoExpanded : sidebarStyles.userInfoCollapsed)}>
            <div className={css(sidebarStyles.userDetails)}>
              <h4 className={css(sidebarStyles.userName)}>{name}</h4>
              <span className={css(sidebarStyles.userEmail)}>{email}</span>
            </div>
          </div>
        </div>
        <div className={css(sidebarStyles.logoutDiv)}>
          <div className={css(sidebarStyles.logoutImg)} onClick={logout}><LogOut /></div>
          <h6
            className={css(expanded ? sidebarStyles.userInfoExpanded : sidebarStyles.userInfoCollapsed)}
            onClick={() => handleBackHome(navigate)}
          >
            <span className={css(sidebarStyles.userLogout)} onClick={logout}>LOGOUT</span>
          </h6>
        </div>
      </nav>
    </aside>
  );
}

export const SidebarItem = ({ icon, text, alert, }) => {
  const { expanded, activeItem, handleItemClick } = useContext(SidebarContext);
  const isActive = activeItem === text;
  return (
    <li className={css(sidebarStyles.menuItem, isActive ? sidebarStyles.menuItemActive : sidebarStyles.menuItemInactive)} onClick={() => handleItemClick(text)}>
      {icon}
      <span className={css(expanded ? sidebarStyles.menuTextExpanded : sidebarStyles.menuTextCollapsed)}>{text}</span>
      {alert && <div className={css(sidebarStyles.alert, expanded ? '' : sidebarStyles.alertCollapsed)} />}
      {!expanded && (
        <div className={css(sidebarStyles.tooltip)}>
          {text}
        </div>
      )}
    </li>
  );
}

export default withNavigate(Sidebar);

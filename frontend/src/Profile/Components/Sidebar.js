import React, { createContext, useContext, useEffect, useState } from 'react';
import { LogOut, PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import { css } from 'aphrodite';
import logo from '../../../public/images/logo.webp';
import { sidebarStyles } from '../../styles/sidebarStyles';
import { withNavigate } from '../../HOC/withNavigate';
import { handleBackHome } from '../../utils/utils';
import { jwtDecode } from 'jwt-decode';
import UserApi from '../../Api/handleUserApi';

const SidebarContext = createContext(undefined);

const Sidebar = ({ children, onSelect, navigate }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState('Appointments');
  const [profileData, setProfileData] = useState({ name: '', lastName: '', email: '' });

  const handleItemClick = (item) => {
    setActiveItem(item);
    onSelect(item);
  }
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const userId = decoded._id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await UserApi.getUserById(userId, token);
        let profileData = response.data;
        setProfileData({
          name: profileData.name,
          lastName: profileData.lastName,
          email:profileData.email,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile()
      .then();
  }, [token, userId]);

  const initials = profileData.name && profileData.lastName ? profileData.name[0] + profileData.lastName[0] : profileData.name[0];

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
          <img
            src={`https://ui-avatars.com/api/?name=${initials}&background=ffffff&color=986D8E&bold=true`}
            alt="initials"
            className={css(sidebarStyles.avatar)}
            width={40}
            height={40} />
          <div className={css(expanded ? sidebarStyles.userInfoExpanded : sidebarStyles.userInfoCollapsed)}>
            <div className={css(sidebarStyles.userDetails)}>
              <h4 className={css(sidebarStyles.userName)}>{profileData.name}</h4>
              <span className={css(sidebarStyles.userEmail)}>{profileData.email}</span>
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

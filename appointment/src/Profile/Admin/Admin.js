import React, { Fragment, useState } from 'react';
import Sidebar, { SidebarItem } from '../Components/Sidebar';
import { Bell, CalendarCheck, Pyramid, UsersRound } from 'lucide-react';
import Appointments from '../Components/Appointments';
import ClientsList from '../Components/ClientsList';
import StaffList from '../Components/StaffList';
import Notifications from '../Components/Notifications/Notifications';
import { css } from 'aphrodite';
import { profileStyles } from '../../styles/profileStyles';

const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState("Appointments");
  const renderComponent = () => {
    switch (selectedComponent) {
      case "Appointments":
        return <Appointments />;
      case "Clients":
        return <ClientsList />;
      case "Staff":
        return <StaffList />;
      case "Notifications":
        return <Notifications />;
      default:
        return <Appointments />;
    }
  };

  return (
    <Fragment>
      <div className={css(profileStyles.sidebar)}>
        <Sidebar onSelect={setSelectedComponent}>
          <SidebarItem icon={<CalendarCheck />} text="Appointments" />
          <SidebarItem icon={<Pyramid />} text="Clients" />
          <SidebarItem icon={<UsersRound />} text="Staff" />
          <SidebarItem icon={<Bell />} text="Notifications" alert />
        </Sidebar>
      </div>
      <div className={css(profileStyles.container)}>
        <h2>HOME SPA</h2>
        {renderComponent()}
      </div>
    </Fragment>
  )
    ;
}

export default Admin;

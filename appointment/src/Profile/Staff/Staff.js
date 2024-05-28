import React, { Fragment, useState } from 'react';
import Sidebar, { SidebarItem } from '../Components/Sidebar';
import { Bell, CalendarCheck, Pyramid } from 'lucide-react';
import Appointments from '../Components/Appointments';
import ClientsList from '../Components/ClientsList';
import Notifications from '../Components/Notifications/Notifications';
import { css } from 'aphrodite';
import { profileStyles } from '../../styles/profileStyles';

const Staff = () => {
  const [selectedComponent, setSelectedComponent] = useState("Appointments");
  const renderComponent = () => {
    switch (selectedComponent) {
      case "Appointments":
        return <Appointments />;
      case "Clients":
        return <ClientsList />;
      case "Notifications":
        return <Notifications />;
      default:
        return <Appointments />;
    }
  };

  return (
    <Fragment>
      <div className={css(profileStyles.container)}>
        <div >
          <Sidebar onSelect={setSelectedComponent}>
            <SidebarItem icon={<CalendarCheck />} text="Appointments" />
            <SidebarItem icon={<Pyramid />} text="Clients" />
            <SidebarItem icon={<Bell />} text="Notifications" alert />
          </Sidebar>
        </div>
        <div>
          <h1>HOME SPA</h1>
          {renderComponent()}
        </div>
      </div>
    </Fragment>
  );
}

export default Staff;

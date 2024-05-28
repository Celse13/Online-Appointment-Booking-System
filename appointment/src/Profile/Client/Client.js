import React, { Fragment, useState } from 'react';
import Sidebar, { SidebarItem } from '../Components/Sidebar';
import { Bell, HandPlatter, CalendarCheck } from 'lucide-react';
import Appointments from '../Components/Appointments';
import Notifications from '../Components/Notifications/Notifications';
import Services from '../../Landing/Services/Services';
import { css } from 'aphrodite';
import { profileStyles } from '../../styles/profileStyles';

const Client = () => {
  const [selectedComponent, setSelectedComponent] = useState("Appointments");
  const renderComponent = () => {
    switch (selectedComponent) {
      case "Appointments":
        return <Appointments />;
      case "Notifications":
        return <Notifications />;
      case "Services":
        return <Services />;
      default:
        return <Appointments />;
    }
  };

  return (
    <Fragment>
      <div className={css(profileStyles.container)}>
        <Sidebar onSelect={setSelectedComponent}>
          <SidebarItem icon={<CalendarCheck />} text="Appointments" />
          <SidebarItem icon={<Bell />} text="Notifications" alert />
          <SidebarItem icon={<HandPlatter />} text="Services" />
        </Sidebar>
        <div>
          {renderComponent()}
        </div>
      </div>
    </Fragment>
  );
}

export default Client;

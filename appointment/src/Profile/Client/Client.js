import React, { Fragment } from 'react';
import Sidebar, { SidebarItem } from '../Sidebar';
import { Bell, HandPlatter, CalendarCheck } from 'lucide-react';

class Client extends React.Component {
  render() {
    return (
      <Fragment>
        <Sidebar>
          <SidebarItem icon={<CalendarCheck />} text="Appointments" active />
          <SidebarItem icon={<Bell />} text="Notifications" alert />
          <SidebarItem icon={<HandPlatter />} text="Services" />
        </Sidebar>
      </Fragment>
    );
  }
}

export default Client;

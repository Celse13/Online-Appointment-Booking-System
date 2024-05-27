import React, { Fragment } from 'react';
import Sidebar, { SidebarItem } from '../Sidebar';
import { Bell, CalendarCheck, Pyramid, UsersRound } from 'lucide-react';

class Staff extends React.Component {
  render() {
    return (
      <Fragment>
        <h1>HOME SPA</h1>
        <Sidebar>
          <SidebarItem icon={<CalendarCheck />} text="Appointments" active />
          <SidebarItem icon={<Pyramid />} text="Clients" />
          <SidebarItem icon={<UsersRound/>} text="Staff" />
          <SidebarItem icon={<Bell />} text="Notifications" alert />
        </Sidebar>
      </Fragment>
    );
  }
}

export default Staff;

import React, { Fragment } from 'react';
import Sidebar, { SidebarItem } from '../Components/Sidebar';
import { Bell, CalendarCheck, Pyramid, UsersRound } from 'lucide-react';

class Admin extends React.Component {
  render() {
    return (
      <Fragment>
        <h1>HOME SPA</h1>
        <Sidebar>
          <SidebarItem icon={<CalendarCheck />} text="Appointments" />
          <SidebarItem icon={<Pyramid />} text="Clients" />
          <SidebarItem icon={<UsersRound/>} text="Staff" />
          <SidebarItem icon={<Bell />} text="Notifications" alert />
        </Sidebar>
      </Fragment>
    );
  }
}

export default Admin;

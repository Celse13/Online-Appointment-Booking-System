import React, { Fragment } from 'react';
import Sidebar, { SidebarItem } from '../Sidebar';
import { Bell, Home, User } from 'lucide-react';

class Admin extends React.Component {
  render() {
    return (
      <Fragment>
        <h1>HOME SPA</h1>
        <Sidebar>
          <SidebarItem icon={<Home />} text="Home" active />
          <SidebarItem icon={<Bell />} text="Notifications" alert />
          <SidebarItem icon={<User />} text="Profile" />
        </Sidebar>
      </Fragment>
    );
  }
}

export default Admin;

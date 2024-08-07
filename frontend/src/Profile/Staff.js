import React from 'react';
import { Bell, CalendarCheck, Pyramid } from 'lucide-react';
import Appointments from './Components/Appointments';
import ClientsList from './Components/ClientsList';
import Notifications from './Components/Notifications';
import renderComponents from './../HOC/renderComponents';

const ComponentMap = {
  "Appointments": Appointments,
  "Clients": ClientsList,
  "Notifications": Notifications
};

const SidebarItems = [
  { icon: <CalendarCheck />, text: "Appointments" },
  { icon: <Pyramid />, text: "Clients" },
  { icon: <Bell />, text: "Notifications", alert: true }
];

const Staff = renderComponents(ComponentMap, SidebarItems, "", 'staff');

export default Staff;

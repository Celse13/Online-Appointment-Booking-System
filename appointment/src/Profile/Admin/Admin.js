import React from 'react';
import { Bell, CalendarCheck, Pyramid, UsersRound } from 'lucide-react';
import Appointments from '../Components/Appointments';
import ClientsList from '../Components/ClientsList';
import StaffList from '../Components/StaffList';
import Notifications from '../Components/Notifications/Notifications';
import renderComponents from '../../HOC/renderComponents';

const ComponentMap = {
  "Appointments": Appointments,
  "Clients": ClientsList,
  "Staff": StaffList,
  "Notifications": Notifications
};

const SidebarItems = [
  { icon: <CalendarCheck />, text: "Appointments" },
  { icon: <Pyramid />, text: "Clients" },
  { icon: <UsersRound />, text: "Staff" },
  { icon: <Bell />, text: "Notifications", alert: true }
];

const Admin = renderComponents(ComponentMap, SidebarItems, "HOME SPA");

export default Admin;

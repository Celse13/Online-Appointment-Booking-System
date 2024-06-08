import React from 'react';
import {
  Bell,
  CalendarCheck,
  CircleUserRound,
  HandPlatter,
  Pyramid,
  UsersRound,
} from 'lucide-react';
import Appointments from './Components/Appointments';
import ClientsList from './Components/ClientsList';
import StaffList from './Components/StaffList';
import Notifications from './Components/Notifications';
import renderComponents from '../HOC/renderComponents';
import userProfile from './Components/userProfile';
import CreateService from './Components/ServicesContainer/CreateService';

const ComponentMap = {
  "Appointments": Appointments,
  "Clients": ClientsList,
  "Staff": StaffList,
  "Notifications": Notifications,
  "Profile": userProfile,
  "Services": CreateService,
};

const SidebarItems = [
  { icon: <CalendarCheck />, text: "Appointments" },
  { icon: <CircleUserRound />, text: "Profile" },
  { icon: <HandPlatter />, text: "Services" },
  { icon: <Pyramid />, text: "Clients" },
  { icon: <UsersRound />, text: "Staff" },
  { icon: <Bell />, text: "Notifications", alert: true },
];

const Admin = renderComponents(ComponentMap, SidebarItems, "", 'admin');

export default Admin;

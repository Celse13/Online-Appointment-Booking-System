import React from 'react';
import { Bell, CalendarCheck, CircleUserRound, HandPlatter } from 'lucide-react';
import Appointments from './Components/Appointments';
import Notifications from './Components/Notifications';
import renderComponents from './../HOC/renderComponents';
import userProfile from './Components/userProfile';
import ServicesContainer from './Components/ServicesContainer/ServicesContainer';

const ComponentMap = {
  "Appointments": Appointments,
  "Profile": userProfile,
  "Services": ServicesContainer,
  "Notifications": Notifications
};

const SidebarItems = [
  { icon: <CalendarCheck />, text: "Appointments" },
  { icon: <CircleUserRound />, text: "Profile" },
  { icon: <HandPlatter />, text: "Services" },
  { icon: <Bell />, text: "Notifications", alert: true },
];

const Client = renderComponents(ComponentMap, SidebarItems, "", 'client');

export default Client;

import React from 'react';
import { Bell, CalendarCheck, CircleUserRound, HandPlatter } from 'lucide-react';
import Appointments from './Components/Appointments';
import Notifications from './Components/Notifications';
import renderComponents from './../HOC/renderComponents';
import userProfile from './Components/userProfile';
import ServicesContainer from './Components/ServicesContainer/ServicesContainer';

const ComponentMap = {
  "Appointments": Appointments,
  "Notifications": Notifications,
  "Services": ServicesContainer,
  "Profile": userProfile
};

const SidebarItems = [
  { icon: <CalendarCheck />, text: "Appointments" },
  { icon: <Bell />, text: "Notifications", alert: true },
  { icon: <HandPlatter />, text: "Services" },
  { icon: <CircleUserRound />, text: "Profile" }
];

const Client = renderComponents(ComponentMap, SidebarItems, "");

export default Client;

import React from 'react';
import { Bell, HandPlatter, CalendarCheck, CircleUserRound } from 'lucide-react';
import Appointments from './Components/Appointments';
import Notifications from './Components/Notifications';
import Services from './../Landing/Services/Services';
import renderComponents from './../HOC/renderComponents';
import userProfile from './Components/userProfile';

const ComponentMap = {
  "Appointments": Appointments,
  "Notifications": Notifications,
  "Services": Services,
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

import React from 'react';
import { Bell, HandPlatter, CalendarCheck } from 'lucide-react';
import Appointments from '../Components/Appointments';
import Notifications from '../Components/Notifications/Notifications';
import Services from '../../Landing/Services/Services';
import renderComponents from '../../HOC/renderComponents';

const ComponentMap = {
  "Appointments": Appointments,
  "Notifications": Notifications,
  "Services": Services
};

const SidebarItems = [
  { icon: <CalendarCheck />, text: "Appointments" },
  { icon: <Bell />, text: "Notifications", alert: true },
  { icon: <HandPlatter />, text: "Services" }
];

const Client = renderComponents(ComponentMap, SidebarItems, "CLIENT PORTAL");

export default Client;

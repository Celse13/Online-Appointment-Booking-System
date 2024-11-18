import React, { useState, useEffect } from 'react';
import Calendars from './Calendars';
import { BusinessAppointments, ClientAppointments } from '../../Api/handleAppointments';
import { jwtDecode } from 'jwt-decode';

const AppointmentScheduler = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const role = decoded.role;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const getAppointments = role === 'business' || role === 'staff' ? BusinessAppointments.getBusinessAppointments : ClientAppointments.getClientAppointments;
        const response = await getAppointments(token);
        const appointments = response.appointments.map((appointment) => ({
          Id: appointment._id,
          Subject: role === 'business' || role === 'staff' ? `Client: ${appointment.clientName}` : `Appointment with: ${appointment.service[0].name}`,
          StartTime: new Date(appointment.dateTime),
          EndTime: new Date(new Date(appointment.dateTime).getTime() + 30 * 60000),
          Location: appointment.service[0].location,
          Status: appointment.status,
        }));
        setAppointmentsData(appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments()
      .then();
  }, [role, token]);

  return (
    <div>
      <Calendars appointmentsData={appointmentsData} />
    </div>
  );
};

export default AppointmentScheduler;

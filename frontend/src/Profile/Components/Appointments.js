import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Container, Spinner, Alert, Dropdown, } from 'react-bootstrap';
import { Pencil, Trash2 } from 'lucide-react';
import { css } from 'aphrodite';
import { appointmentStyles } from '../../styles/profCompStyles';
import { BusinessAppointments, ClientAppointments } from '../../Api/Services/handleAppointments';
import { jwtDecode } from 'jwt-decode';

// Fetch it from local storage
const userPrefers24HourFormat = localStorage.getItem('userPrefers24HourFormat') === 'true';
// Helper function to format time
const formatTime = (time) => {
  if (userPrefers24HourFormat) {
    return time;
  } else {
    const [hour, minute] = time.split(':');
    const hourIn12 = hour % 12 || 12;
    const period = hour < 12 ? 'AM' : 'PM';
    return `${hourIn12}:${minute} ${period}`;
  }
};

const Appointments = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [showDetails, setShowDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const role = decoded.role;

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const getAppointments = role === 'business' ? BusinessAppointments.getBusinessAppointments : ClientAppointments.getClientAppointments;
        const response = await getAppointments(token);
        const appointments = response.appointments.map((appointment) => ({
          id: appointment._id,
          name: role === 'business' ? `Client: ${appointment.clientName}` : `Appointment with: ${appointment.serviceName}` ,
          date: new Date(appointment.dateTime).toLocaleDateString(),
          time: formatTime(new Date(appointment.dateTime).toLocaleTimeString()),
          location: appointment.service[0].location,
          status: appointment.status,
        }));
        setAppointmentsData(appointments);
        setShowDetails(appointments.map(() => false));
      } catch (error) {
        console.error(error);
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchAppointments()
      .then();
  }, []);

  const toggleDetails = (index) => {
    setShowDetails((prevDetails) =>
      prevDetails.map((detail, i) => (i === index ? !detail : detail))
    );
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await BusinessAppointments.updateAppointmentStatus(appointmentId, newStatus, token);
      setAppointmentsData((prevData) =>
        prevData.map((app) => (app._id === appointmentId ? { ...app, status: newStatus } : app))
      );
      alert(`Status updated to ${newStatus}`)
      window.location.reload();
    } catch (error) {
      console.error('Error updating appointment status:', error);
      setIsError(true);
      alert('Error updating appointment status')
      window.location.reload();
    }
  };

  if (isLoading) {
    return <Spinner animation="border" role="status"><span className="sr-only"></span></Spinner>;
  }

  if (isError) {
    return <Alert variant="danger">An error occurred while fetching appointments.</Alert>;
  }

  if (appointmentsData.length === 0) {
    return <Alert variant="info">No appointments found.</Alert>;
  }

  return (
    <Container className={css(appointmentStyles.container)}>
      <h3>Appointments List</h3>
      <Container className={css(appointmentStyles.listContainer)}>
        {appointmentsData.map((appointment, index) => (
          <Card key={index + 1} className={css(appointmentStyles.card)}>
            <CardHeader className={css(appointmentStyles.header)}>
              <h6>{appointment.name}</h6>
            </CardHeader>
            {showDetails[index] && (
              <CardBody className={css(appointmentStyles.body)}>
                <div className={css(appointmentStyles.bodyDiv)}>
                  <h6>Date: {appointment.date}</h6>
                  <h6>Time: {appointment.time}</h6>
                  <h6>Location: {appointment.location}</h6>
                  <div>
                    {role === 'business' && (
                      <h6>Status:
                        <Dropdown onSelect={(newStatus) => handleStatusChange(appointment.id, newStatus)}>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {appointment.status}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item eventKey="pending">Pending</Dropdown.Item>
                            <Dropdown.Item eventKey="approved">Approved</Dropdown.Item>
                            <Dropdown.Item eventKey="rejected">Rejected</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </h6>
                    )}
                    {role === 'client' && (
                      <h6>Status: {appointment.status}</h6>
                    )}
                  </div>
                  <div className={css(appointmentStyles.buttons)}>
                    <Button className={css(appointmentStyles.editButton)}><Pencil /></Button>
                    <Button className={css(appointmentStyles.deleteButton)}><Trash2 /></Button>
                  </div>
                </div>
              </CardBody>
            )}
            <CardFooter className={css(appointmentStyles.footer)}>
              <Button
                onClick={() => toggleDetails(index)}
                className={css(appointmentStyles.button)}>
                {showDetails[index] ? 'Hide Details' : 'More Details'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Container>
    </Container>
  );
}

export default Appointments;

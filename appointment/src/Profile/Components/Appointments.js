import React, { useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Container } from 'react-bootstrap';
import { Trash2, Pencil } from 'lucide-react';
import { css } from 'aphrodite';
import { appointmentStyles } from '../../styles/profCompStyles';


const appointmentsData = [
  { id: 1, name: 'Appointment 1', date: '2024-05-27', time: '10:00 AM', location: 'Location 1', status: 'Pending' },
  { id: 2, name: 'Appointment 2', date: '2024-05-28', time: '11:00 AM', location: 'Location 2', status: 'Confirmed' },
  { id: 3, name: 'Appointment 3', date: '2024-05-28', time: '9:00 AM', location: 'Location 3', status: 'Declined' },
  { id: 3, name: 'Appointment 3', date: '2024-05-28', time: '9:00 AM', location: 'Location 3', status: 'Confirmed' },
];

const Appointments = () => {
  const [showDetails, setShowDetails] = useState(appointmentsData.map(() => false));
  const toggleDetails = (index) => {
    setShowDetails((prevDetails) =>
      prevDetails.map((detail, i) => (i === index ? !detail : detail))
    );
  };

  return (
    <Container className={css(appointmentStyles.container)}>
      <h3>Appointments List</h3>
      <Container className={css(appointmentStyles.listContainer)}>
        {appointmentsData.map((appointment, index) => (
          <Card key={appointment.id} className={css(appointmentStyles.card)}>
            <CardHeader className={css(appointmentStyles.header)}>
              <h6>{appointment.name}</h6>
            </CardHeader>
            {showDetails[index] && (
              <CardBody className={css(appointmentStyles.body)}>
                <div className={css(appointmentStyles.bodyDiv)}>
                  <h6>Date: {appointment.date}</h6>
                  <h6>Time: {appointment.time}</h6>
                  <h6>Location: {appointment.location}</h6>
                  <h6>Status: {appointment.status}</h6>
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

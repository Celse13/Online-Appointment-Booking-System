import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Container, Spinner, Alert, Dropdown, Modal, Form, } from 'react-bootstrap';
import { Pencil, Trash2 } from 'lucide-react';
import { css } from 'aphrodite';
import { appointmentStyles } from '../../styles/profCompStyles';
import { BusinessAppointments, ClientAppointments } from '../../Api/handleAppointments';
import { formatTime } from '../../utils/utils';
import { jwtDecode } from 'jwt-decode';

const Appointments = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [showDetails, setShowDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [currentAppointment, setCurrentAppointment] = useState(null);
	const [newDateTime, setNewDateTime] = useState('');
	const token = localStorage.getItem('token');
	const decoded = jwtDecode(token);
	const role = decoded.role;

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const getAppointments = role === 'business' || role === 'staff' ? BusinessAppointments.getBusinessAppointments : ClientAppointments.getClientAppointments;
        const response = await getAppointments(token);
        const appointments = response.appointments.map((appointment) => ({
          id: appointment._id,
          name: role === 'business' || role === 'staff' ? `Client: ${appointment.clientName}` : `Appointment with: ${appointment.service[0].name}` ,
          date: new Date(appointment.dateTime).toLocaleDateString(),
          time: formatTime(new Date(appointment.dateTime).toLocaleTimeString()),
          location: appointment.service[0].location,
          status: appointment.status,
					dateTime: appointment.dateTime,
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

  const handleDelete = async (appointmentId) => {
    try {
      if (role === 'business') {
        await BusinessAppointments.deleteAppointment(token, appointmentId);
      } else {
        await ClientAppointments.deleteAppointment(token, appointmentId);
      }
      setAppointmentsData((prevData) => prevData.filter((app) => app._id !== appointmentId));
      alert('Appointment deleted successfully');
      window.location.reload();
    } catch (error) {
      setIsError(true);
      alert('Error deleting appointment');
    }
  };

	const handleEdit = async () => {
		try {
			await BusinessAppointments.updateAppointment(currentAppointment, newDateTime, token);
			setAppointmentsData((prevData) =>
				prevData.map((app) =>
					app.id === currentAppointment ? { ...app, date: new Date(newDateTime).toLocaleDateString(), time: formatTime(new Date(newDateTime).toLocaleTimeString()) } : app
				)
			);
			setShowModal(false);
			alert('Appointment updated successfully');
			window.location.reload();
		} catch (error) {
			setIsError(true);
			alert('Error updating appointment');
		}
	};

	const handleShowModal = (appointment) => {
		setCurrentAppointment(appointment.id);
		setNewDateTime(formatDateTimeLocal(appointment.dateTime));
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setCurrentAppointment(null);
		setNewDateTime('');
	};

	const formatDateTimeLocal = (dateTime) => {
		const date = new Date(dateTime);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		return `${year}-${month}-${day}T${hours}:${minutes}`;
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
                  <h6>Date: {formatTime(appointment.date)}</h6>
									<h6>Time:
										<input
											type="time"
											name="workingHours"
											value={formatTime(appointment.time)}
											className={css(appointmentStyles.timeInput)}
											readOnly />
									</h6>
									<h6>Location: {appointment.location}</h6>
									<div>
										{role === 'business' && (
											<h6 className={css(appointmentStyles.statusDiv)}>Status:
												<Dropdown onSelect={(newStatus) => handleStatusChange(appointment.id, newStatus)}>
                          <Dropdown.Toggle className={css(appointmentStyles.statusButton)}>
                            {appointment.status}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
                            <Dropdown.Item eventKey="Approved">Approved</Dropdown.Item>
                            <Dropdown.Item eventKey="Rejected">Rejected</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </h6>
                    )}
                    {role === 'client' && (
                      <h6>Status: {appointment.status}</h6>
                    )}
                  </div>
                  <div className={css(appointmentStyles.buttons)}>
                    <Button className={css(appointmentStyles.editButton)} onClick={() => handleShowModal(appointment)}><Pencil /></Button>
                    <Button className={css(appointmentStyles.deleteButton)} onClick={() => handleDelete(appointment.id)}><Trash2 /></Button>
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
				{currentAppointment && (
					<Modal show={showModal} onHide={handleCloseModal} className={css(appointmentStyles.modal)}>
						<Modal.Header closeButton className={css(appointmentStyles.header)}>Update Date and Time</Modal.Header>
						<Modal.Body>
							<Form>
								<Form.Group controlId="formDateTime" >
									<Form.Control
										className={css(appointmentStyles.modalBody)}
										type="datetime-local"
										value={newDateTime}
										onChange={(e) => setNewDateTime(e.target.value)}
									/>
								</Form.Group>
							</Form>
						</Modal.Body>
						<Modal.Footer className={css(appointmentStyles.footer)}>
							<Button variant="secondary" onClick={handleCloseModal} className={css(appointmentStyles.button)}>Close</Button>
							<Button variant="primary" onClick={handleEdit} className={css(appointmentStyles.button)}>Save Changes</Button>
						</Modal.Footer>
					</Modal>
				)}
      </Container>
    </Container>
  );
}

export default Appointments;

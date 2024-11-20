import React, { useState, useEffect } from 'react';
import { Button, Container, Spinner, Alert, Dropdown, Modal, Form, Table } from 'react-bootstrap';
import deleteButton from '../../../public/images/delete.webp';
import editButton from '../../../public/images/edit.webp';
import { css } from 'aphrodite';
import { appointmentStyles } from '../../styles/profCompStyles';
import { BusinessAppointments, ClientAppointments } from '../../Api/handleAppointments';
import { formatTime } from '../../utils/utils';
import { jwtDecode } from 'jwt-decode';


const Appointments = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);
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
          clientName: appointment.clientName,
          serviceName: appointment.service[0].name,
          date: new Date(appointment.dateTime).toLocaleDateString(),
          time: formatTime(new Date(appointment.dateTime).toLocaleTimeString()),
          location: appointment.service[0].location,
          status: appointment.status,
					dateTime: appointment.dateTime,
        }));
        setAppointmentsData(appointments);
      } catch (error) {
        console.error(error);
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchAppointments()
      .then();
  }, []);

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

      <Table >
        <thead className={css(appointmentStyles.tableHead)}>
        <tr>
          <th className={css(appointmentStyles.headText)}></th>
          <th className={css(appointmentStyles.headText)}>Service</th>
          {role === 'business' && (
            <th className={css(appointmentStyles.headText)}>Client</th>
          )}
          <th className={css(appointmentStyles.headText)}>Location</th>
          <th className={css(appointmentStyles.headText)}>Date</th>
          <th className={css(appointmentStyles.headText)}>Time</th>
          <th className={css(appointmentStyles.headText)}>Status</th>
        </tr>
        </thead>
        <tbody className={css(appointmentStyles.tableBody)}>
        {appointmentsData.map((appointment, index) => (
          <tr key={index + 1}>
            <td className={css(appointmentStyles.text)}>
              <input
                type="checkbox"
                className={css(appointmentStyles.circularCheckbox)}
                id={`checkbox-${index}`}
              />
            </td>
            <td className={css(appointmentStyles.text)}>{appointment.serviceName}</td>
            {role === 'business' && (
              <td className={css(appointmentStyles.text)}>{appointment.clientName}</td>
            )}
            <td className={css(appointmentStyles.text)}>{appointment.location}</td>
            <td className={css(appointmentStyles.text)}>{formatTime(appointment.date)}</td>
            <td className={css(appointmentStyles.text)}>{formatTime(appointment.time)}</td>
            {role === 'client' && (
              <td className={css(appointmentStyles.text)}>{appointment.status}</td>
            )}
            {role === 'business' && (
              <td className={css(appointmentStyles.text)}>
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
              </td>
            )}
            <td className={css(appointmentStyles.text)}>
              <div className={css(appointmentStyles.buttons)}>
                <Button className={css(appointmentStyles.editButton)}
                        onClick={() => handleShowModal(appointment)}><img src={editButton} alt="" /></Button>
                <Button className={css(appointmentStyles.deleteButton)}
                        onClick={() => handleDelete(appointment.id)}><img src={deleteButton} alt="" /></Button>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
      {currentAppointment && (
        <Modal show={showModal} onHide={handleCloseModal} className={css(appointmentStyles.modal)}>
          <Modal.Header closeButton className={css(appointmentStyles.header)}>Update Date and
            Time</Modal.Header>
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
  );
}

export default Appointments;

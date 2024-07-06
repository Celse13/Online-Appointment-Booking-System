import React, { useState } from 'react';
import { Button, Card, Container, Form, Modal, Table } from 'react-bootstrap';
import { css } from 'aphrodite';
import { appointmentStyles, clientsListStyles, createServiceStyles, staffListStyles, } from '../../styles/profCompStyles';
import { Plus, XCircle } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import { signStyles } from '../../styles/authStyles';

const StaffList = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [showVerification, setShowVerification] = useState(false);
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const userId = decoded._id; /* Todo --> get biz id instead of user id */

  const handleConfirm = () => {
    handleCloseModal();
    setShowVerification(true);
  };

  const handleClose = () => setShowVerification(false);

  const staffData = [
    { id: 1, name: 'Staff 1' },
    { id: 2, name: 'Staff 2' },
    { id: 3, name: 'Staff 3' },
  ];

  return (
    <Container className={css(staffListStyles.container)}>
      <div className={css(staffListStyles.addDiv)}>
        <Button className={css(appointmentStyles.button)} onClick={() => handleShowModal()}>
          <Plus/> Add Staff
        </Button>
      </div>
      <h3>Staff List</h3>
      <Table bordered>
        <thead className={css(clientsListStyles.tableHead)}>
        <tr>
          <th className={css(clientsListStyles.headText)}></th>
          <th className={css(clientsListStyles.headText)}>Staff Name</th>
        </tr>
        </thead>
        <tbody className={css(clientsListStyles.tableBody)}>
        {staffData.map((staff, index) => (
          <tr key={staff.id}>
            <td className={css(clientsListStyles.text)}>{index + 1}</td>
            <td className={css(clientsListStyles.text)}>{staff.name}</td>
          </tr>
        ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal} className={css(appointmentStyles.modal)}>
        <Modal.Header closeButton className={css(appointmentStyles.header)}>
          New Staff Member
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label className={css(createServiceStyles.label)}>Business ID</Form.Label>
              <Form.Control
                type='text'
                name='businessId'
                value={userId}
                className={css(createServiceStyles.input)}
                readOnly/>
            </Form.Group>
            <Form.Group>
              <Form.Label className={css(createServiceStyles.label)}>First Name</Form.Label>
              <Form.Control
                type='text'
                name='firstName'
                className={css(createServiceStyles.input)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label className={css(createServiceStyles.label)}>Last Name</Form.Label>
              <Form.Control
                type='text'
                name='lastName'
                className={css(createServiceStyles.input)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label className={css(createServiceStyles.label)}>Email</Form.Label>
              <Form.Control
                type='email'
                name='email'
                className={css(createServiceStyles.input)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label className={css(createServiceStyles.label)}>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                className={css(createServiceStyles.input)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label className={css(createServiceStyles.label)}>Role</Form.Label>
              <Form.Control
                type='text'
                name='role'
                value='staff'
                className={css(createServiceStyles.input)}
                readOnly/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className={css(appointmentStyles.footer)}>
          <Button className={css(appointmentStyles.button)} onClick={handleConfirm}>Create</Button>
        </Modal.Footer>
      </Modal>
      {showVerification && (
        <div className={css(signStyles.verificationDiv)}>
          <Card className={css(signStyles.verificationCard)}>
            <Card.Header className={css(signStyles.verificationCardHeader)} onClick={handleClose}><XCircle
              className={css(signStyles.verificationCardHeaderClose)} /></Card.Header>
            <Card.Body>
              <Card.Title
                className={css(signStyles.verificationCardTitle)}>VERIFICATION</Card.Title>
              <Card.Text className={css(signStyles.verificationCardText)}>
                Account verification email and login details have been sent to the email address: <br /><span
                className={css(signStyles.verificationEmailAddress)}> staff@email.com.</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </Container>
  );
}

export default StaffList;

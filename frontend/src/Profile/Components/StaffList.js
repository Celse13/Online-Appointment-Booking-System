import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form, Modal, Spinner, Table } from 'react-bootstrap';
import { css } from 'aphrodite';
import { appointmentStyles, clientsListStyles, createServiceStyles, staffListStyles, } from '../../styles/profCompStyles';
import { Plus, XCircle } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import { signStyles } from '../../styles/authStyles';
import BusinessApi from '../../Api/handleBusinessApi';
import StaffApi from '../../Api/handleStaffApi';
import { permissions } from '../../utils/utils';

const StaffList = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [showVerification, setShowVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({ id: '' });
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const userId = decoded._id;
  const [staff, setStaff] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    role: 'staff',
    position: '',
    startTime: '',
    endTime: '',
    permissions: [],
  });

  useEffect(() => {
    const fetchStaff = async () => {
      setIsLoading(true);
      try {
        const staffData = await StaffApi.getBusinessStaff(token);
        setStaff(staffData.staff)
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching staff:', error);
        setIsLoading(false);
      }
    };
    const fetchBiz = async () => {
      try {
        let profileData = await BusinessApi.getBusinessByUserId(userId, token);
        setProfileData({
          id: profileData._id,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchStaff().then();
    fetchBiz().then();
  }, [token, userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prevFormData => ({
        ...prevFormData,
        permissions: checked
          ? [...prevFormData.permissions, value]
          : prevFormData.permissions.filter(permission => permission !== value)
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    console.log(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: 'staff',
        position: formData.position,
        workingHours: {
          startTime: formData.startTime,
          endTime: formData.endTime
        },
        permissions: formData.permissions,
      };
      const res = await StaffApi.createStaff(userData, token);
      if (res && res.ok) {
        setStaff(prevStaff => [...prevStaff, res.staff]);
        handleCloseModal();
        setShowVerification(true);
      } else {
        alert('Error creating staff.');
      }
    } catch (error) {
      alert('An error occurred while creating staff. Please try again.');
    }
  };

  const handleClose = () => setShowVerification(false);

  if (isLoading) {
    return <Spinner animation="border" />;
  }

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
        {staff.map((staff, index) => (
          <tr key={staff._id}>
            <td className={css(clientsListStyles.text)}>{index + 1}</td>
            <td className={css(clientsListStyles.text)}>{staff.user.name} {staff.user.lastName}</td>
          </tr>
        ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal} className={css(appointmentStyles.modal)}>
        <Modal.Header closeButton className={css(appointmentStyles.header)}>
          Business ID: {profileData.id}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label className={css(createServiceStyles.label)}>First Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className={css(createServiceStyles.input)}
                required />
            </Form.Group>
            <Form.Group>
              <Form.Label className={css(createServiceStyles.label)}>Last Name</Form.Label>
              <Form.Control
                type='text'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                className={css(createServiceStyles.input)}
                required />
            </Form.Group>
            <Form.Group>
              <Form.Label className={css(createServiceStyles.label)}>Email</Form.Label>
              <Form.Control
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className={css(createServiceStyles.input)}
                required />
            </Form.Group>
            <Form.Group>
              <Form.Label className={css(createServiceStyles.label)}>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className={css(createServiceStyles.input)}
                required />
            </Form.Group>
            <Form.Group>
              <Form.Label className={css(createServiceStyles.label)}>Position</Form.Label>
              <Form.Control
                type='text'
                name='position'
                value={formData.position}
                onChange={handleChange}
                className={css(createServiceStyles.input)}
                required />
            </Form.Group>
            <Form.Group>
              <Form.Label className={css(createServiceStyles.label)}>Working hours start time</Form.Label>
              <Form.Control
                className={css(createServiceStyles.input)}
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required />
            </Form.Group>
            <Form.Group>
              <Form.Label className={css(createServiceStyles.label)}>Working hours end time</Form.Label>
              <Form.Control
                className={css(createServiceStyles.input)}
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required />
            </Form.Group>
            <Form.Group>
              <Form.Label className={css(createServiceStyles.label)}>Permissions</Form.Label>
              <div className={css(createServiceStyles.checkboxGroup)}>
                {permissions.map((userPermission) => (
                  <Form.Check
                    key={userPermission}
                    type="checkbox"
                    label={userPermission}
                    name="serviceDays"
                    value={userPermission}
                    checked={formData.permissions.includes(userPermission)}
                    onChange={handleChange}
                    className={css(createServiceStyles.checkbox)}
                  />
                ))}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className={css(appointmentStyles.footer)}>
          <Button onClick={handleSubmit} className={css(appointmentStyles.button)}>Create</Button>
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

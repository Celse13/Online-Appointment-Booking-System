import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Row, } from 'react-bootstrap';
import ppic from '../../Assets/ppic.png';
import { css } from 'aphrodite';
import { appointmentStyles, myProfileStyles } from '../../styles/profCompStyles';
import { BusinessServicesApi } from '../../Api/Services/handleServicesApi';
import { Pencil, Trash2 } from 'lucide-react';
import { formatTime } from '../../utils/utils';
import { jwtDecode } from 'jwt-decode';

const Profile = ({ userType }) => {
  const isClient = userType === 'client';
  const isAdmin = userType === 'admin';
  const [services, setServices] = useState([]);
  const [showDetails, setShowDetails] = useState([]);
	const token = localStorage.getItem('token');
	const decoded = jwtDecode(token);
  const email = decoded.email;
  const name = decoded.username;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await BusinessServicesApi.getBusinessServices(token);
        const servicesData = response.services;
        if (Array.isArray(servicesData)) {
          setServices(servicesData);
          setShowDetails(servicesData.map(() => false));
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    if (isAdmin) {
      fetchServices()
        . then();
    }
  }, [isAdmin]);

  const handleMoreInfo = (index) => {
    setShowDetails((prevDetails) =>
      prevDetails.map((detail, i) => (i === index ? !detail : detail))
    );
  };

  const handleDelete = async (serviceId) => {
    try {
      await BusinessServicesApi.deleteService(serviceId, token);
      setServices((prevData) => prevData.filter((serv) => serv._id !== serviceId));
      alert('Service deleted');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  }

  const renderMyServices = () => {
    return services.map((service, index) => (
      <div className={css(myProfileStyles.myServicesItem)}>
        <div key={service._id} className={css(myProfileStyles.myServicesItemName)}>
          <h4>{service.serviceName}</h4>
          <p className={css(myProfileStyles.moreInfo)} onClick={() => handleMoreInfo(index)}>{showDetails[index] ? 'hide ' : '...more '}details</p>
        </div>
        {showDetails[index] && (
          <div key={service._id} className={css(myProfileStyles.details)}>
            <p>Description: {service.serviceDescription}</p>
            <p>Duration: {service.serviceDuration}</p>
            <p>Price: {service.servicePrice}</p>
            <p>Location: {service.serviceLocation}</p>
            <p>Days: {service.serviceDays.join(', ')}</p>
            <p>Working Hours: {formatTime(service.workingHours.startHour + ':' + service.workingHours.startMinute)} - {formatTime(service.workingHours.endHour + ':' + service.workingHours.endMinute)}</p>
            <div className={css(appointmentStyles.buttons)}>
              <Button className={css(appointmentStyles.editButton)}><Pencil /></Button>
              <Button className={css(appointmentStyles.deleteButton)} onClick={() => handleDelete(service._id)}><Trash2 /></Button>
            </div>
          </div>
        )}
      </div>
    ));
  };

  return (
    <Container>
      <Row
        className={css(isClient && myProfileStyles.clientContainer, isAdmin && myProfileStyles.adminContainer)}>
        <Col md={6}>
          <Card className={css(isClient && myProfileStyles.clientCard, isAdmin && myProfileStyles.adminCard)}>
            <CardHeader className={css(myProfileStyles.header)}>
              <img src={ppic} alt="profile picture" className={css(myProfileStyles.ppic)} />
            </CardHeader>
            <CardBody className={css(myProfileStyles.body)}>
              <div className={css(myProfileStyles.bodyDiv)}>
                <h6>Name: {name}</h6>
                <h6>Email: {email}</h6>
                <a href="#" className={css(myProfileStyles.resetPass)}>Reset password</a>
              </div>
            </CardBody>
            <CardFooter className={css(myProfileStyles.footer)}>
              <Button className={css(myProfileStyles.button)}>Edit Profile</Button>
            </CardFooter>
          </Card>
        </Col>
        {isAdmin && (
          <Col md={6} className={css(myProfileStyles.myServices)}>
            <h2>My Services</h2>
            <div className={css(myProfileStyles.myServicesDiv)}>
              {services.length > 0 ? renderMyServices() : <h6>No services available</h6>}
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Profile;

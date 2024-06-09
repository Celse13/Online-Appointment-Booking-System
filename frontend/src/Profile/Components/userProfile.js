import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Container } from 'react-bootstrap';
import ppic from '../../Assets/ppic.png';
import { css } from 'aphrodite';
import { myProfileStyles } from '../../styles/profCompStyles';
import { BusinessServicesApi } from '../../Api/Services/handleServicesApi';

const Profile = ({ userType }) => {
  const isClient = userType === 'client';
  const isAdmin = userType === 'admin';
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await BusinessServicesApi.getBusinessServices(token);
        const servicesData = response.services;
        if (Array.isArray(servicesData)) {
          setServices(servicesData);
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

  const renderMyServices = () => {
    return services.map((service) => (
      <div key={service._id} className={css(myProfileStyles.myServicesItem)}>
        <h6>{service.serviceName}</h6>
        <Button variant='danger'>Delete</Button>
      </div>
    ));
  };

  return (
    <Container>
      <Container className={css(isClient && myProfileStyles.clientContainer, isAdmin && myProfileStyles.adminContainer)}>
        <Card className={css(isClient && myProfileStyles.clientCard, isAdmin && myProfileStyles.adminCard)}>
          <CardHeader className={css(myProfileStyles.header)}>
            <img src={ppic} alt="profile picture" className={css(myProfileStyles.ppic)} />
          </CardHeader>
          <CardBody className={css(myProfileStyles.body)}>
            <div className={css(myProfileStyles.bodyDiv)}>
              <h6>Name: Aisha Minne</h6>
              <h6>Email: m_aisha@gmail.com</h6>
              <a href="#">Reset password</a>
            </div>
          </CardBody>
          <CardFooter className={css(myProfileStyles.footer)}>
            <Button className={css(myProfileStyles.button)}>Edit Profile</Button>
          </CardFooter>
        </Card>
        {isAdmin && (
          <Container className={css(myProfileStyles.myServices)}>
            <h2>My Services</h2>
            <div className={css(myProfileStyles.myServicesDiv)}>
              {services.length > 0 ? renderMyServices() : <h6>No services available</h6>}
            </div>
          </Container>
        )}
      </Container>
    </Container>

  );
}

export default Profile;

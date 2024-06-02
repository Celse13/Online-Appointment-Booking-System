import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Container } from 'react-bootstrap';
import ppic from '../../Assets/ppic.png';
import { css } from 'aphrodite';
import { myProfileStyles } from '../../styles/profCompStyles';
import { servicesListData } from './ServicesContainer/servicesData';

const Profile = ({ userType }) => {
  const isClient = userType === 'client';
  const isAdmin = userType === 'admin';

  const renderMyServices = () => {
    return servicesListData.map((service) => (
      <div className={css(myProfileStyles.myServicesItem)}>
        <h6 key={service.id}>{service.serviceName}</h6>
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
              {renderMyServices()}
            </div>
          </Container>
        )}
      </Container>
    </Container>

  );
}

export default Profile;

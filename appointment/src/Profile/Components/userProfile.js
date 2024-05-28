import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Container } from 'react-bootstrap';
import ppic from '../../Assets/ppic.png';
import { css } from 'aphrodite';
import { myProfileStyles } from '../../styles/profCompStyles';

const Profile = () => {
  return (
    <Container className={css(myProfileStyles.container)}>
      <h3>My Profile</h3>
      <Card className={css(myProfileStyles.card)}>
        <CardHeader className={css(myProfileStyles.header)}>
          <img src={ppic} alt='profile picture' className={css(myProfileStyles.ppic)}/>
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
    </Container>

  );
}

export default Profile;

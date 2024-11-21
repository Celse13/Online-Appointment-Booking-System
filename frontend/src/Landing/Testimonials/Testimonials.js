import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'react-bootstrap';
import { css } from 'aphrodite';
import { testimonialsStyles } from '../../styles/landingStyles';
import person1 from '../../../public/images/person1.png';
import person2 from '../../../public/images/person2.png';
import person3 from '../../../public/images/person3.png';

class Testimonials extends React.Component {
  render() {
    return (
      <Container className={css(testimonialsStyles.testimonialsContainer)}>
        <Row>
          <h1>TESTIMONIALS</h1>
          <Col md={4}>
            <Card className={css(testimonialsStyles.testimonialsCard)}>
              <CardHeader className={css(testimonialsStyles.testimonialsCardHeader)}>
                <img src={person1} alt="" width='100%' height='100%'/>
              </CardHeader>
              <CardBody>
                <p className={css(testimonialsStyles.testimonialsCardBodyP)}>
                  “This platform has transformed the way I manage my business.
                  Clients can book appointments effortlessly, and I no longer have to juggle phone calls and manual schedules.
                  It’s a game-changer for my salon!”
                </p>
                <cite>~Riziki S.</cite>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={css(testimonialsStyles.testimonialsCard)}>
              <CardHeader className={css(testimonialsStyles.testimonialsCardHeader)}>
                <img src={person2} alt='' width='100%' height='100%'/>
              </CardHeader>
              <CardBody>
                <p className={css(testimonialsStyles.testimonialsCardBodyP)}>
                  “I used to spend hours coordinating meetings with clients.
                  With this tool, scheduling is stress-free.
                  It’s professional, intuitive, and keeps my calendar perfectly organized.
                  I highly recommend it!”
                </p>
                <cite>~Aisha N.</cite>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={css(testimonialsStyles.testimonialsCard)}>
              <CardHeader className={css(testimonialsStyles.testimonialsCardHeader)}>
                <img src={person3} alt="" width="100%" height="100%" />
              </CardHeader>
              <CardBody>
                <p className={css(testimonialsStyles.testimonialsCardBodyP)}>
                  “Using this system has made my life so much easier.
                  I can manage my sessions, track bookings, and send reminders—all in one place.
                  My clients appreciate the seamless experience, and I love the time it saves me!”
                </p>
                <cite>~Max M.</cite>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Testimonials;

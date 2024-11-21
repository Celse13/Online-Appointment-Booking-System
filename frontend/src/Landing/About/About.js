import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { css } from 'aphrodite';
import about from '../../../public/images/about.png';
import { aboutStyles, homeStyles } from '../../styles/landingStyles';
import AnimatedCard from '../../HOC/animatedCard';

const About = () => {
  return (
    <Container className={css(aboutStyles.aboutContainer)}>
      <Row>
        <h1>ABOUT US</h1>
        <Col md={6} className={css(aboutStyles.about)}>
          <div className={css(aboutStyles.aboutText)}>
            <h5 className={css(aboutStyles.h5)}>
              Our platform connects individuals and businesses with intuitive tools for managing
              appointments effortlessly.
              Whether you’re booking a meeting, reserving a service, or staying on top of your
              schedule, we’ve got you covered.
            </h5>
            <br />
            <h5 className={css(aboutStyles.h5)}>
              At our core, we believe in enhancing productivity and creating meaningful
              connections.
              By combining user-friendly design with powerful features, we empower professionals
              and
              clients alike to save time and focus on what matters most.
              Join us in redefining the way you organize your day—one appointment at a time.
            </h5>
          </div>

        </Col>
        <Col md={6}>
          <AnimatedCard
            imgSrc={about}
            cardStyle={aboutStyles.aboutCard}
            imgStyle={homeStyles.landingImage}
            altText="About image"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default About;

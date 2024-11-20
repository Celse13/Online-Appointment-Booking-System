import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { css } from 'aphrodite';
import about from '../../../public/images/about.webp';
import { aboutStyles } from '../../styles/landingStyles';

class About extends React.Component {
  render() {
    return (
      <Container className={css(aboutStyles.aboutContainer)}>
        <Row>
          <h1>ABOUT US</h1>
          <Col md={6} className={css(aboutStyles.about)}>
            <h5 className={css(aboutStyles.aboutText)}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              faucibus, nisl at luctus fermentum, nisi dui fringilla massa.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              faucibus, nisl at luctus fermentum, nisi dui fringilla massa.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              faucibus, nisl at luctus fermentum, nisi dui fringilla massa.
            </h5>
          </Col>
          <Col md={6}>
            <Card className={css(aboutStyles.aboutCard)}>
              <img src={about} alt=''/>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default About;

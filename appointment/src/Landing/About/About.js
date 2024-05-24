import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { css } from 'aphrodite';
import about from '../../Assets/about.png';
import { aboutStyles } from '../../styles/landingStyles';

class About extends React.Component {
  render() {
    return (
      <Container className={css(aboutStyles.aboutContainer)}>
        <Row>
          <h1>ABOUT US</h1>
          <Col md={6}></Col>
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

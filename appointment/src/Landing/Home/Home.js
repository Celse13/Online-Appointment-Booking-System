import React from 'react';
import { css } from 'aphrodite';
import { homeStyles } from '../../styles/landingStyles';
import { Card, Col, Container, Row } from 'react-bootstrap';
import home from '../../assets/home.png';

class Home extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md={6}>
            <h1 className={css(homeStyles.slogan)}>SCHEDULR your number 1 appointment maker</h1>
          </Col>
          <Col md={6}>
            <Card className={css(homeStyles.homeCard)}>
              <img src={home} alt=""/>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;

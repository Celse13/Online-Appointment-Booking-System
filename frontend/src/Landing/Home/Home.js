import React from 'react';
import { css } from 'aphrodite';
import { homeStyles } from '../../styles/landingStyles';
import { Card, Col, Container, Row } from 'react-bootstrap';
import home from '../../../public/images/home.webp';

class Home extends React.Component {
  render() {
    return (
      <Container className={css(homeStyles.homeContainer)}>
        <Row>
          <Col md={6} className={css(homeStyles.sloganDiv)}>
            <h1 className={css(homeStyles.slogan)}><em className={css(homeStyles.sloganEm)}>SCHEDULR</em> Where Quality Service Meets Convenience
            </h1>
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

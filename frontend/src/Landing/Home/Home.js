import React from 'react';
import { css } from 'aphrodite';
import { homeStyles } from '../../styles/landingStyles';
import { Col, Container, Row } from 'react-bootstrap';
import home from '../../../public/images/home.webp';
import AnimatedCard from '../../HOC/animatedCard';

const Home = () => {

  return (
    <Container className={css(homeStyles.homeContainer)}>
      <Row>
        <Col md={6} className={css(homeStyles.sloganDiv)}>
          <h1 className={css(homeStyles.slogan)}><em className={css(homeStyles.sloganEm)}>SCHEDULR</em> Where Quality Service Meets Convenience
          </h1>
        </Col>
        <Col md={6}>
          <AnimatedCard
            imgSrc={home}
            cardStyle={homeStyles.homeCard}
            imgStyle={homeStyles.landingImage}
            altText="Home image"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

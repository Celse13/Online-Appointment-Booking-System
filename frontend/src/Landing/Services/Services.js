import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import services from '../../../public/images/services.webp';
import { css } from 'aphrodite';
import { homeStyles, servicesStyles } from '../../styles/landingStyles';
import { serviceCategoriesFilter } from '../../Profile/Components/ServicesContainer/servicesData';
import AnimatedCard from '../../HOC/animatedCard';

const Services = () => {
  return (
    <Container className={css(servicesStyles.servicesContainer)}>
      <Row>
        <h1>SERVICES</h1>
        <Col md={6}>
          <AnimatedCard
            imgSrc={services}
            cardStyle={servicesStyles.servicesCard}
            imgStyle={homeStyles.landingImage}
            altText="Services image"
          />
        </Col>
        <Col md={6}>
          <div className={css(servicesStyles.gridContainer)}>
            {serviceCategoriesFilter.map((service) => (
              <Card
                key={service.id}
                className={css(servicesStyles.gridContainerCard)}>
                <img
                  src={service.image}
                  alt={service.category}
                  aria-label={service.category}
                  className={css(servicesStyles.gridContainerItem)}
                />
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Services;

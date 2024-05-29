import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { css } from 'aphrodite';
import { servicesCategoriesStyles } from '../../../styles/profCompStyles';

const ServiceCategories = ({ onSelectCategory }) => {
  return (
    <Container className={css(servicesCategoriesStyles.servicesContainer)}>
      <h1>SERVICES</h1>
      <Row>
        <div className={css(servicesCategoriesStyles.gridContainer)}>
          {serviceCategoriesData.map((service) => (
            <Card
              key={service.id}
              className={css(servicesCategoriesStyles.gridContainerCard)}
              onClick={() => onSelectCategory(service.id, service.category)}>
              <img
                src={service.image}
                alt={service.category}
                aria-label={service.category}
                className={css(servicesCategoriesStyles.gridContainerItem)}
              />
            </Card>
          ))}
        </div>
      </Row>
    </Container>
  );
}

export default ServiceCategories;

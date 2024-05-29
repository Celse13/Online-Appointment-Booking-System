import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { css } from 'aphrodite';
import Health from '../../../Assets/Health.png';
import Fitness from '../../../Assets/Fitness.png';
import Consultation from '../../../Assets/Consultation.png';
import Salon from '../../../Assets/Salon.png';
import Spa from '../../../Assets/Spa.png';
import Counselling from '../../../Assets/Counselling.png';
import Tuition from '../../../Assets/Tuition.png';
import Other from '../../../Assets/Other.png';
import { servicesCategoriesStyles } from '../../../styles/profCompStyles';

const serviceCategoriesData = [
  { id: 1, category: 'Health', image: Health },
  { id: 2, category: 'Fitness', image: Fitness },
  { id: 3, category: 'Consultation', image: Consultation },
  { id: 4, category: 'Salon And Barber', image: Salon },
  { id: 5, category: 'Massage And Spa', image: Spa },
  { id: 6, category: 'Counselling', image: Counselling },
  { id: 7, category: 'Tuition', image: Tuition },
  { id: 8, category: 'Other', image: Other },
];

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

import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import services from '../../assets/services.png';
import { css } from 'aphrodite';
import { servicesStyles } from '../../styles/landingStyles';
import Health from '../../Assets/Health.png';
import Fitness from '../../Assets/Fitness.png';
import Consultation from '../../Assets/Consultation.png';
import Salon from '../../Assets/Salon.png';
import Spa from '../../Assets/Spa.png';
import Counselling from '../../Assets/Counselling.png';
import Tuition from '../../Assets/Tuition.png';
import Other from '../../Assets/Other.png';

const serviceCategoriesData = [
  { id: 1, category: 'Health', image: Health },
  { id: 2, category: 'Fitness', image: Fitness },
  { id: 3, category: 'Consultation', image: Consultation },
  { id: 4, category: 'Salon And Barber', image: Salon },
  { id: 5, category: 'Spa', image: Spa },
  { id: 6, category: 'Counselling', image: Counselling },
  { id: 7, category: 'Tuition', image: Tuition },
  { id: 8, category: 'Other', image: Other },
];

class Services extends React.Component {
  render() {
    return (
      <Container className={css(servicesStyles.servicesContainer)}>
        <Row>
          <h1>SERVICES</h1>
          <Col md={6}>
            <Card className={css(servicesStyles.servicesCard)}>
              <img src={services} alt=''/>
            </Card>
          </Col>
          <Col md={6}>
            <div className={css(servicesStyles.gridContainer)}>
              {serviceCategoriesData.map((service) => (
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
  }
}

export default Services;

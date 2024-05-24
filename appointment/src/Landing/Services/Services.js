import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import services from '../../assets/services.png';
import { css } from 'aphrodite';
import { servicesStyles } from '../../styles/landingStyles';
import health from '../../assets/health.png';
import fitness from '../../assets/fitness.png';
import consultation from '../../assets/consultation.png';
import salon from '../../assets/salon.png';
import spa from '../../assets/spa.png';
import counselling from '../../assets/counselling.png';
import tuition from '../../assets/tuition.png';
import other from '../../assets/other.png';

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
              <Card className={css(servicesStyles.gridContainerCard)}>
                <img src={health} alt="health" aria-label="health" className={css(servicesStyles.gridContainerItem)} />
              </Card>
              <Card className={css(servicesStyles.gridContainerCard)}>
                <img src={fitness} alt="fitness" aria-label="fitness" className={css(servicesStyles.gridContainerItem)} />
              </Card>
              <Card className={css(servicesStyles.gridContainerCard)}>
                <img src={consultation} alt="consultation" aria-label="consultation" className={css(servicesStyles.gridContainerItem)} />
              </Card>
              <Card className={css(servicesStyles.gridContainerCard)}>
                <img src={salon} alt="salon" aria-label="salon" className={css(servicesStyles.gridContainerItem)} />
              </Card>
              <Card className={css(servicesStyles.gridContainerCard)}>
                <img src={spa} alt="spa" aria-label="spa" className={css(servicesStyles.gridContainerItem)} />
              </Card>
              <Card className={css(servicesStyles.gridContainerCard)}>
                <img src={counselling} alt="counselling" aria-label="counselling" className={css(servicesStyles.gridContainerItem)} />
              </Card>
              <Card className={css(servicesStyles.gridContainerCard)}>
                <img src={tuition} alt="tuition" aria-label="tuition" className={css(servicesStyles.gridContainerItem)} />
              </Card>
              <Card className={css(servicesStyles.gridContainerCard)}>
                <img src={other} alt="other" aria-label="other" className={css(servicesStyles.gridContainerItem)} />
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Services;

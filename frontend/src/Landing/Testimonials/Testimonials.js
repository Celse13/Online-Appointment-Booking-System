import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'react-bootstrap';
import { css } from 'aphrodite';
import { testimonialsStyles } from '../../styles/landingStyles';
import person1 from '../../../public/assets/person1.png';
import person2 from '../../../public/assets/person2.png';
import person3 from '../../../public/assets/person3.png';

class Testimonials extends React.Component {
  render() {
    return (
      <Container className={css(testimonialsStyles.testimonialsContainer)}>
        <Row>
          <h1>TESTIMONIALS</h1>
          <Col md={4}>
            <Card className={css(testimonialsStyles.testimonialsCard)}>
              <CardHeader className={css(testimonialsStyles.testimonialsCardHeader)}>
                <img src={person1} alt="" width='100%' height='100%'/>
              </CardHeader>
              <CardBody>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Ut phasellus eu tempus urna. Ultrices
                  lectus viverra suspendisse elit arcu mattis.
                </p>
                <cite>~Riziki S.</cite>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={css(testimonialsStyles.testimonialsCard)}>
              <CardHeader className={css(testimonialsStyles.testimonialsCardHeader)}>
                <img src={person2} alt='' width='100%' height='100%'/>
              </CardHeader>
              <CardBody>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Ut phasellus eu tempus urna. Ultrices
                  lectus viverra suspendisse elit arcu mattis.
                </p>
                <cite>~Aisha N.</cite>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={css(testimonialsStyles.testimonialsCard)}>
              <CardHeader className={css(testimonialsStyles.testimonialsCardHeader)}>
                <img src={person3} alt='' width='100%' height='100%'/>
              </CardHeader>
              <CardBody>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Ut phasellus eu tempus urna. Ultrices
                  lectus viverra suspendisse elit arcu mattis.
                </p>
                <cite>~Abdul M.</cite>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Testimonials;

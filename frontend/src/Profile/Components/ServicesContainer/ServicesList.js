import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Container } from 'react-bootstrap';
import { ArrowLeft } from 'lucide-react';
import { css } from 'aphrodite';
import { servicesListStyles } from '../../../styles/profCompStyles';
import { servicesListData } from './servicesData';

const ServicesList = ({ selectedCategoryId, selectedCategoryName, onBackSelected }) => {
  const filteredServices = servicesListData.filter(
    (service) => service.categoryId === selectedCategoryId
  );

  return (
    <Container >
      <Card className={css(servicesListStyles.backCard)}>
        <ArrowLeft size={35} onClick={onBackSelected} className={css(servicesListStyles.back)} />
      </Card>
      <h1>{selectedCategoryName} Service Providers</h1>
      <Container className={css(servicesListStyles.container)}>
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <Card key={service.id} className={css(servicesListStyles.card)}>
              <CardHeader className={css(servicesListStyles.header)}>
                <h3>{service.name}</h3>
              </CardHeader>
              <CardBody className={css(servicesListStyles.body)}>
                <div className={css(servicesListStyles.bodyDiv)}>
                  <h6>Duration: {service.duration}</h6>
                  <h6>Cost: {service.cost}</h6>
                  <h6>Time: {service.workingHours}</h6>
                  <h6>Location: {service.location}</h6>
                </div>
              </CardBody>
              <CardFooter className={css(servicesListStyles.footer)}>
                <Button className={css(servicesListStyles.button)}>
                  Book
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <h4>No services available for this category.</h4>
        )}
      </Container>
    </Container>
  );
};

export default ServicesList;

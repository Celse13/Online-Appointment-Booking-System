import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Container } from 'react-bootstrap';
import { ArrowLeft } from 'lucide-react';
import { css } from 'aphrodite';
import { servicesListStyles } from '../../../styles/profCompStyles';

const servicesListData = [
  { id: 1, categoryId: 1, name: 'Tele-Medicine', duration: '30 minutes', cost: 50, workingHours: '9:00 AM - 5:00 PM', location: 'Online' },
  { id: 2, categoryId: 2, name: 'Fitness by Aziz', duration: '120 minutes', cost: 100, workingHours: '6:00 AM - 10:00 PM', location: 'Smart Gym' },
  { id: 3, categoryId: 3, name: 'MMS Firm', duration: '30 minutes', cost: 50, workingHours: '9:00 AM - 5:00 PM', location: 'MMS Head Office' },
  { id: 4, categoryId: 4, name: 'Cutz', duration: '60 minutes', cost: 50, workingHours: '9:00 AM - 5:00 PM', location: 'Cutz Salon' },
  { id: 5, categoryId: 5, name: 'Massage', duration: '1 hour', cost: 100, workingHours: '9:00 AM - 5:00 PM', location: 'Massage Parlor' },
  { id: 6, categoryId: 6, name: 'Your Therapy Companion', duration: '60 minutes', cost: 100, workingHours: '11:00 AM - 11:00 PM', location: 'Therapy Center'},
  { id: 7, categoryId: 7, name: 'Mathletes', duration: '60 minutes', cost: 50, workingHours: '9:00 AM - 4:00 PM', location: 'Home' },
  { id: 8, categoryId: 5, name: 'Zen space', duration: '60 minutes', cost: 50, workingHours: '10:00 AM - 6:00 PM', location: 'Zen Space Center' },
  { id: 9, categoryId: 8, name: 'Zap Electrics', duration: '60 minutes', cost: 50, workingHours: '7:00 AM - 5:00 PM', location: 'Home' },
  { id: 10, categoryId: 7, name: 'Science Nerds', duration: '60 minutes', cost: 50, workingHours: '9:00 AM - 4:00 PM', location: 'Home' },
  { id: 11, categoryId: 6, name: 'Children Therapy', duration: '60 minutes', cost: 50, workingHours: '9:00 AM - 5:00 PM', location: 'Therapy Center' },
  { id: 12, categoryId: 4, name: 'Hair by T', duration: '60 minutes', cost: 50, workingHours: '9:00 AM - 5:00 PM', location: 'Hair by T Salon' },
];

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

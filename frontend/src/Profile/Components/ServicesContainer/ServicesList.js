import React, { useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Container, Form, FormControl, FormGroup, FormLabel, } from 'react-bootstrap';
import { ArrowLeft } from 'lucide-react';
import { css } from 'aphrodite';
import { servicesListStyles } from '../../../styles/profCompStyles';
import { servicesListData } from './servicesData';
import { getCurrentDate } from '../../../utils/utils';

const initializeFormData = (service) => ({
  serviceName: service ? service.serviceName : '',
  servicePrice: service ? service.cost : '',
  serviceDuration: service ? service.duration : '',
  time: '',
  date: '',
  openingTime: service ? service.openingTime : '',
  closingTime: service ? service.closingTime : '',
  serviceDays: service ? service.serviceDays : [],
});

const checkTimeDateError = (name, value, formData) => {
  if (name === 'time') {
    const selectedTime = new Date(`2000-01-01T${value}`);
    const openingTime = new Date(`2000-01-01T${formData.openingTime}`);
    const closingTime = new Date(`2000-01-01T${formData.closingTime}`);

    if (selectedTime < openingTime || selectedTime > closingTime) {
      return `Please select a time between ${formData.openingTime} and ${formData.closingTime}`;
    }
  }
  if (name === 'date') {
    const selectedDate = new Date(value);
    const dayOfWeek = selectedDate.getDay();
    const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const selectedDay = daysMap[dayOfWeek];

    if (!formData.serviceDays.includes(selectedDay)) {
      return `Please select a date on ${formData.serviceDays.join(', ')}`;
    }
  }
  return '';
};
const ServicesList = ({ selectedCategoryId, selectedCategoryName, onBackSelected }) => {
  const filteredServices = servicesListData
    .filter((service) => service.categoryId === selectedCategoryId
  );

  const [formData, setFormData] = useState(initializeFormData());
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = checkTimeDateError(name, value, formData);

    if (error) {
      setErrorMessage(error);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: '',
      }));
    } else {
      setErrorMessage('');
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleBookClick = (service) => {
    setFormData(initializeFormData(service));
    setIsFormVisible(true);
    setErrorMessage('');
  };

  const handleConfirmClick = () => {
    setIsFormVisible(false);
    setFormData(initializeFormData());
  };

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
                <h3>{service.serviceName}</h3>
              </CardHeader>
              <CardBody className={css(servicesListStyles.body)}>
                <div className={css(servicesListStyles.bodyDiv)}>
                  <h6>Duration: {service.duration}</h6>
                  <h6>Cost: {service.cost}</h6>
                  <h6>Time: {service.openingTime} - {service.closingTime}</h6>
                  <h6>Location: {service.location}</h6>
                  <h6>Days: {service.serviceDays.join(',\n')}</h6>
                </div>
              </CardBody>
              <CardFooter className={css(servicesListStyles.footer)}>
                <Button className={css(servicesListStyles.button)} onClick={() => handleBookClick(service)}>Book</Button>
              </CardFooter>
              {isFormVisible && formData.serviceName === service.serviceName && (
                <Form onSubmit={handleConfirmClick} className={css(servicesListStyles.bookingForm)}>
                  <FormGroup>
                    <FormLabel className={css(servicesListStyles.label)}>Time</FormLabel>
                    <FormControl
                      className={css(servicesListStyles.input)}
                      type="time"
                      name="time"
                      min={formData.openingTime}
                      max={formData.closingTime}
                      placeholder="Time"
                      value={formData.time}
                      onChange={handleChange}
                      required />
                    <FormLabel className={css(servicesListStyles.label)}>Date</FormLabel>
                    <FormControl
                      className={css(servicesListStyles.input)}
                      type="date"
                      name="date"
                      min={getCurrentDate()}
                      placeholder="Date"
                      value={formData.date}
                      onChange={handleChange}
                      required />
                  </FormGroup>
                  {errorMessage && (
                    <div className={css(servicesListStyles.error)}>
                      {errorMessage}
                    </div>
                  )}
                  <Button type="submit" className={css(servicesListStyles.button)}>Confirm</Button>
                </Form>
              )}
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

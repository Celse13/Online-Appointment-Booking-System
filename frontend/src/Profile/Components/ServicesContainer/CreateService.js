import React, { useState } from 'react';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import { serviceCategoriesData } from './servicesData';
import { css } from 'aphrodite';
import { createServiceStyles } from '../../../styles/profCompStyles';


// Adding the BusinessServicesApi and ClientServicesApi import
import { BusinessServicesApi } from '../../../Api/Services/handleServicesApi';


const CreateService = () => {
  const [formData, setFormData] = useState({
    serviceName: '',
    serviceCategory: '',
    serviceDescription: '',
    openingTime: '',
    closingTime: '',
    openingPeriod: 'AM',
    closingPeriod: 'AM',
    serviceDuration: '',
    servicePrice: '',
    serviceLocation: '',
    serviceDays: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        serviceDays: checked
          ? [...prevFormData.serviceDays, value]
          : prevFormData.serviceDays.filter(day => day !== value)
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const serviceData = {
        serviceName: formData.serviceName,
        serviceDuration: [formData.serviceDuration],
        servicePrice: formData.servicePrice,
        serviceCategory: formData.serviceCategory,
        serviceLocation: formData.serviceLocation,
        serviceDescription: formData.serviceDescription,
        workingHours: {
          startHour: formatHour(formData.openingTime),
          startMinute: formatMinute(formData.openingTime),
          startPeriod: formatPeriod(formData.openingTime),
          endHour: formatHour(formData.closingTime),
          endMinute: formatMinute(formData.closingTime),
          endPeriod: formatPeriod(formData.closingTime),
        },
        serviceDays: formData.serviceDays,
        
      };
      console.log(serviceData);
      const response = await BusinessServicesApi.createServices(serviceData, token);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  const formatHour = (time) => {
    const hour = parseInt(time.split(':')[0]);
    return hour > 12 ? hour - 12 : hour;
  };

  const formatMinute = (time) => {
    return parseInt(time.split(':')[1]);
  };

  const formatPeriod = (time) => {
    const hour = parseInt(time.split(':')[0]);
    return hour >= 12 ? 'PM' : 'AM';
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <Container className={css(createServiceStyles.container)}>
      <Form onSubmit={handleSubmit} className={css(createServiceStyles.form)}>
        <h5 className={css(createServiceStyles.formHeader)}>Create a new service</h5>
        <Form.Group>
          <Form.Label className={css(createServiceStyles.label)}>Service Name</Form.Label>
          <Form.Control
            className={css(createServiceStyles.input)}
            type="text"
            name="serviceName"
            placeholder="name"
            value={formData.serviceName}
            onChange={handleChange}
            required />
        </Form.Group>
        <Form.Group>
          <Form.Label className={css(createServiceStyles.label)}>Service Category</Form.Label>
          <Form.Control
            className={css(createServiceStyles.input)}
            as="select"
            name="serviceCategory"
            value={formData.serviceCategory}
            onChange={handleChange}
            required>
            <option value="" disabled>Select service category</option>
            {serviceCategoriesData.map(category => (
              <option
                key={category.id}
                value={category.category}>
                {category.category}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className={css(createServiceStyles.label)}>Opening Time</Form.Label>
          <Form.Control
            className={css(createServiceStyles.input)}
            type="time"
            name="openingTime"
            value={formData.openingTime}
            onChange={handleChange}
            required />
        </Form.Group>
        <Form.Group>
          <Form.Label className={css(createServiceStyles.label)}>Closing Time</Form.Label>
          <Form.Control
            className={css(createServiceStyles.input)}
            type="time"
            name="closingTime"
            value={formData.closingTime}
            onChange={handleChange}
            required />
        </Form.Group>
        <Form.Group>
          <Form.Label className={css(createServiceStyles.label)}>Service Duration</Form.Label>
          <InputGroup>
            <Form.Control
              className={css(createServiceStyles.inputDuration)}
              type="number" name="serviceDuration"
              placeholder="duration"
              min={5} max={480}
              value={formData.serviceDuration}
              onChange={handleChange}
              required />
            <InputGroup.Text className={css(createServiceStyles.inputDurationText)}>minutes</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label className={css(createServiceStyles.label)}>Service Price</Form.Label>
          <InputGroup>
            <Form.Control
              className={css(createServiceStyles.inputDuration)}
              type="number" name="servicePrice"
              placeholder="price"
              min={1}
              value={formData.servicePrice}
              onChange={handleChange}
              required />
            <InputGroup.Text className={css(createServiceStyles.inputDurationText)}>KSH</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label className={css(createServiceStyles.label)}>Service Location</Form.Label>
          <Form.Control
            className={css(createServiceStyles.input)}
            type="text"
            name="serviceLocation"
            placeholder="location"
            value={formData.serviceLocation}
            onChange={handleChange}
            required />
        </Form.Group>
        <Form.Group>
          <Form.Label className={css(createServiceStyles.label)}>Service Description</Form.Label>
          <Form.Control
            className={css(createServiceStyles.input)}
            as="textarea"
            name="serviceDescription"
            placeholder="description"
            value={formData.serviceDescription}
            onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label className={css(createServiceStyles.label)}>Operating Days</Form.Label>
          <div className={css(createServiceStyles.checkboxGroup)}>
            {daysOfWeek.map((day) => (
              <Form.Check
                key={day}
                type="checkbox"
                label={day}
                name="serviceDays"
                value={day}
                checked={formData.serviceDays.includes(day)}
                onChange={handleChange}
                className={css(createServiceStyles.checkbox)}
              />
            ))}
          </div>
        </Form.Group>
        <Button type="submit" className={css(createServiceStyles.button)}>CREATE</Button>
      </Form>
    </Container>
  );
}

export default CreateService;

import React, { useState } from 'react';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import { serviceCategoriesData } from './servicesData';
import { css } from 'aphrodite';
import { createServiceStyles } from '../../../styles/profCompStyles';

const CreateService = () => {
  const [formData, setFormData] = useState({
    serviceName: '',
    serviceCategory: '',
    openingTime: '',
    closingTime: '',
    serviceDuration: '',
    servicePrice: '',
    serviceLocation: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Container className={css(createServiceStyles.container)}>

      <Form onSubmit={handleSubmit} className={css(createServiceStyles.form)}>
        <h5>Create a new service</h5>
        <Form.Group>
          <Form.Control className={css(createServiceStyles.input)} type="text" name="serviceName"
                        placeholder="name" value={formData.serviceName} onChange={handleChange}
                        required />
          <Form.Label className={css(createServiceStyles.label)}>Service Name</Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Control className={css(createServiceStyles.input)} as="select" name="serviceCategory" value={formData.serviceCategory} onChange={handleChange} required>
            <option value="" disabled>Select service category</option>
            {serviceCategoriesData.map(category => (
              <option key={category.id} value={category.category}>
                {category.category}
              </option>
            ))}
          </Form.Control>
          <Form.Label className={css(createServiceStyles.label)}>Service Category</Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Control className={css(createServiceStyles.input)} type="time" name="openingTime" value={formData.openingTime} onChange={handleChange} required />
          <Form.Label className={css(createServiceStyles.label)}>Opening Time</Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Control className={css(createServiceStyles.input)} type="time" name="closingTime" value={formData.closingTime} onChange={handleChange} required />
          <Form.Label className={css(createServiceStyles.label)}>Closing Time</Form.Label>
        </Form.Group>
        <Form.Group>
          <InputGroup>
            <Form.Control className={css(createServiceStyles.inputDuration)} type="number" name="serviceDuration" placeholder="duration" min={5} max={480} value={formData.serviceDuration} onChange={handleChange} required />
            <InputGroup.Text className={css(createServiceStyles.inputDurationText)}>minutes</InputGroup.Text>
          </InputGroup>
          <Form.Label className={css(createServiceStyles.label)}>Service Duration</Form.Label>
        </Form.Group>
        <Form.Group>
          <InputGroup>
            <Form.Control className={css(createServiceStyles.inputDuration)} type="number" name="servicePrice" placeholder="price" min={1} value={formData.servicePrice} onChange={handleChange} required />
            <InputGroup.Text className={css(createServiceStyles.inputDurationText)}>KSH</InputGroup.Text>
          </InputGroup>
          <Form.Label className={css(createServiceStyles.label)}>Service Price</Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Control className={css(createServiceStyles.input)} type="text" name="serviceLocation" placeholder="location" value={formData.serviceLocation} onChange={handleChange} required />
          <Form.Label className={css(createServiceStyles.label)}>Service Location</Form.Label>
        </Form.Group>
        <Button type="submit" className={css(createServiceStyles.button)}>CREATE</Button>
      </Form>
    </Container>
  );
}

export default CreateService;

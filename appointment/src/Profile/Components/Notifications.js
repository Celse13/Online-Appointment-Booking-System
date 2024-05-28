import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { css } from 'aphrodite';
import { notificationsStyles } from '../../styles/profCompStyles';

const Notifications = () => {
  return (
    <Container className={css(notificationsStyles.container)}>
      <h3>Notifications</h3>
      <Card className={css(notificationsStyles.card)}>

      </Card>
    </Container>
  );
};

export default Notifications;

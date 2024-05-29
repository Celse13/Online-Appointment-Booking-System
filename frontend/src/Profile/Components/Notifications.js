import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { css } from 'aphrodite';
import { notificationsStyles } from '../../styles/profCompStyles';

const notificationsData = [
  { id: 1, message: 'Notification 1', markAsRead: false },
  { id: 2, message: 'Notification 2', markAsRead: false },
  { id: 3, message: 'Notification 3', markAsRead: false },
];

const Notifications = () => {
  return (
    <Container className={css(notificationsStyles.container)}>
      <h3>Notifications</h3>
      <Card className={css(notificationsStyles.card)}>
        {notificationsData.map((notification) => (
          <h5 key={notification.id} className={css(notificationsStyles.text)}>
            {notification.message}
          </h5>
        ))}
      </Card>
    </Container>
  );
};

export default Notifications;

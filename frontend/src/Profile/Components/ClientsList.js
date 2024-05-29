import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { css } from 'aphrodite';
import { clientsListStyles } from '../../styles/profCompStyles';

const clientsData = [
  { id: 1, name: 'Client 1' },
  { id: 2, name: 'Client 2' },
  { id: 3, name: 'Client 3' },
];

const ClientsList = () => {
  return (
    <Container className={css(clientsListStyles.container)}>
      <h3>Client List</h3>
      <Card className={css(clientsListStyles.card)}>
        {clientsData.map((client) => (
          <h5 key={client.id} className={css(clientsListStyles.text)}>
            {client.name}
          </h5>
        ))}
      </Card>
    </Container>
  );
}

export default ClientsList;

import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner } from 'react-bootstrap';
import { css } from 'aphrodite';
import { clientsListStyles } from '../../styles/profCompStyles';
import ClientApiHandler from "../../Api/Clients/handleClientsApi";

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const data = await ClientApiHandler.getClients(token);
      setClients(data.clients);
      setIsLoading(false);
    };

    fetchClients()
			.then();
  }, []);

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  return (
    <Container className={css(clientsListStyles.container)}>
      <h3>Client List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Client ID</th>
            <th>Number of Appointments</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={client._id}>
              <td>{index + 1}</td>
              <td>{client.client}</td>
              <td>{client.appointments.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ClientsList;

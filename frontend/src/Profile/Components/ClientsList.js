import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner } from 'react-bootstrap';
import { css } from 'aphrodite';
import { clientsListStyles } from '../../styles/profCompStyles';
import ClientApiHandler from "../../Api/handleClientsApi";

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
      <Table bordered>
        <thead className={css(clientsListStyles.tableHead)}>
          <tr>
            <th className={css(clientsListStyles.headText)}></th>
            <th className={css(clientsListStyles.headText)}>Client Name</th>
            <th className={css(clientsListStyles.headText)}>Appointments</th>
          </tr>
        </thead>
        <tbody className={css(clientsListStyles.tableBody)}>
          {clients.map((client, index) => (
            <tr key={client._id}>
              <td className={css(clientsListStyles.text)}>{index + 1}</td>
              <td className={css(clientsListStyles.text)}>{client.client.name} {client.client.lastName}</td>
              <td className={css(clientsListStyles.text)}>{client.appointments.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ClientsList;

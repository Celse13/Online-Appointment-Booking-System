import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { css } from 'aphrodite';
import { staffListStyles } from '../../styles/profCompStyles';

const staffData = [
  { id: 1, name: 'Staff 1' },
  { id: 2, name: 'Staff 2' },
  { id: 3, name: 'Staff 3' },
];

const StaffList = () => {
  return (
    <Container className={css(staffListStyles.container)}>
      <h3>staff List</h3>
      <Card className={css(staffListStyles.card)}>
        {staffData.map((staff) => (
          <h5 key={staff.id} className={css(staffListStyles.text)}>
            {staff.name}
          </h5>
        ))}
      </Card>
    </Container>
  );
}

export default StaffList;

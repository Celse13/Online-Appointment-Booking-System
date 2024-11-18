import React from 'react';
import '../../styles/calendar.css';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Inject } from '@syncfusion/ej2-react-schedule';

const Calendars = ({ appointmentsData }) => {
  return (
    <div className="app">
      <ScheduleComponent
        selectedDate={new Date()}
        eventSettings={{ dataSource: appointmentsData, }}
      >
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>
    </div>
  );
};

export default Calendars;

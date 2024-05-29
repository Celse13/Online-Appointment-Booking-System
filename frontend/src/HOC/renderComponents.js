import React, { Fragment, useState } from 'react';
import { css } from 'aphrodite';
import { profileStyles } from '../styles/profileStyles';
import Sidebar, { SidebarItem } from '../Profile/Components/Sidebar';

const renderComponents = (ComponentMap, SidebarItems, headerText) => {
  return () => {
    const [selectedComponent, setSelectedComponent] = useState(Object.keys(ComponentMap)[0]);

    const renderComponent = () => {
      const SelectedComponent = ComponentMap[selectedComponent];
      return <SelectedComponent />;
    };

    return (
      <Fragment>
        <div className={css(profileStyles.sidebar)}>
          <Sidebar onSelect={setSelectedComponent}>
            {SidebarItems.map(({ icon, text, alert }) => (
              <SidebarItem key={text} icon={icon} text={text} alert={alert} />
            ))}
          </Sidebar>
        </div>
        <div className={css(profileStyles.container)}>
          <h2>{headerText}</h2>
          {renderComponent()}
        </div>
      </Fragment>
    );
  };
};

export default renderComponents;

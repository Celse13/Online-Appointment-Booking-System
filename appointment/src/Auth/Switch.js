import React from 'react';
import { css } from 'aphrodite';
import { switchStyles } from '../styles/authStyles';

export const Switch = ({isToggled, onToggle}) => {
  return (
    <div className={css(switchStyles.switchContainer)}>
      <h4 className={css(switchStyles.text)}>Client</h4>
      <label className={css(switchStyles.switch)}>
        <input type="checkbox" checked={isToggled} onChange={onToggle} className={css(switchStyles.input)} />
        <span className={css(switchStyles.slider, isToggled && switchStyles.sliderChecked)}>
          <span className={css(switchStyles.sliderBefore, isToggled && switchStyles.sliderCheckedBefore)}></span>
        </span>
      </label>
      <h4 className={css(switchStyles.text)}>Business</h4>
    </div>
  );
};

import React from 'react';
import { Card } from 'react-bootstrap';
import { css } from 'aphrodite';
import useIntersectionObserver from '../hooks/observer';
import { homeStyles } from '../styles/landingStyles';

const AnimatedCard = ({ imgSrc, cardStyle, imgStyle, altText }) => {
  const { isVisible, elementRef } = useIntersectionObserver();

  return (
    <Card ref={elementRef} className={css(cardStyle)}>
      <img
        src={imgSrc}
        alt={altText}
        className={css(isVisible ? imgStyle : homeStyles.hidden)}
      />
    </Card>
  );
};

export default AnimatedCard;

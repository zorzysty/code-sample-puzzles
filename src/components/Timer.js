import * as PropTypes from 'prop-types';
import React from 'react';


const Timer = ({ time, error }) => (
  <div className={`Timer ${error ? 'Timer--error' : ''}`}>
    {time > 0 ? `TIME: ${time}` : 'Drag first item to start the clock.'}
  </div>
);

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  error: PropTypes.bool.isRequired,
};

export default Timer;

import * as PropTypes from 'prop-types';
import React from 'react';


const Congratulations = ({ visible }) => (
  visible && <div className="Congratulations">Awesome! You won!!!</div>
);

Congratulations.propTypes = { visible: PropTypes.bool.isRequired };

export default Congratulations;

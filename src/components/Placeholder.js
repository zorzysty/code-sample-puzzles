import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';


function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
  };
}

const spec = {
  drop: (props, monitor, component) => ({
    // set success prop of dropResult depending on whether piece was placed in correct place
    success: monitor.getItem().id === component.props.index,
  }),
};

class Placeholder extends PureComponent {
  render() {
    const { connectDropTarget, hovered } = this.props;

    return connectDropTarget(
      <div className={`Placeholder ${hovered ? 'Placeholder-hovered' : ''}`} />,
    );
  }
}

Placeholder.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  hovered: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
};

export default DropTarget('piece', spec, collect)(Placeholder);

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import imgSrc from '../assets/picture.jpg';
import { DIMENSIONS } from '../const';


const spec = {
  beginDrag: (props) => {
    props.handleDrag();
    return props.piece;
  },
  endDrag: (props, monitor) => {
    // return piece to original position when dropped outside of target
    if (!monitor.didDrop()) return;

    // pass piece to handleDrop method if placed correctly and false otherwise
    props.handleDrop(monitor.getDropResult().success && props.piece);
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

class Piece extends PureComponent {
  render() {
    const {
      isDragging, // eslint-disable-line react/prop-types
      connectDragSource, // eslint-disable-line react/prop-types
      style,
      piece,
    } = this.props;

    // hide piece in drawer while it's being dragged
    const opacity = isDragging ? 0 : 1;
    // prevent overlaying of images while dragging
    const zIndex = isDragging ? 0 : 10;
    // set proper piece image using CSS sprites
    const left = -(piece.id % DIMENSIONS.columns) * DIMENSIONS.pieceSize;
    const top = -Math.floor(piece.id / DIMENSIONS.rows) * DIMENSIONS.pieceSize;

    return connectDragSource(
      <div
        className="Piece"
        style={{
          background: `url(${imgSrc})`,
          backgroundPosition: `${left}px ${top}px`,
          backgroundSize: `${DIMENSIONS.columns * 100}%`,
          opacity,
          zIndex,
          ...style,
        }}
      />,
    );
  }
}

export default DragSource('piece', spec, collect)(Piece);

Piece.propTypes = {
  piece: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  handleDrop: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  handleDrag: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  style: PropTypes.objectOf(PropTypes.string),
};

Piece.defaultProps = {
  handleDrop: () => {},
  handleDrag: () => {},
  style: {},
};

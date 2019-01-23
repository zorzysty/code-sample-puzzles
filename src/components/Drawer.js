import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Piece from './Piece';
import { getRandomPositions } from '../utilities';


class Drawer extends PureComponent {
  constructor(props) {
    super(props);

    // generate random positions to put pieces in within drawer
    this.positions = getRandomPositions(props.pieces.length);
  }

  render() {
    const {
      handleDrop, pieces, handleDrag,
    } = this.props;

    return pieces.length > 0 && (
      <div className="Drawer">
        {pieces.map(piece => (
          <Piece
            key={piece.id}
            piece={piece}
            handleDrop={handleDrop}
            handleDrag={handleDrag}
            style={this.positions[piece.id]}
          />
        ))}
      </div>
    );
  }
}

Drawer.propTypes = {
  pieces: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  handleDrop: PropTypes.func.isRequired,
  handleDrag: PropTypes.func.isRequired,
};

export default Drawer;

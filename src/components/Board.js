import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Placeholder from './Placeholder';
import Piece from './Piece';
import { DIMENSIONS } from '../const';


class Board extends PureComponent {
  constructor(props) {
    super(props);
    this.pieceNumbers = [...Array(DIMENSIONS.pieceCount).keys()];
  }

  drawPieces() {
    const { pieces } = this.props;

    // render Piece for every piece in pieces array and a placeholder (drop target) for the rest
    return this.pieceNumbers.map((number) => {
      const piece = pieces.find(({ id }) => id === number);
      return piece
        ? <Piece key={number} piece={piece} />
        : <Placeholder key={number} index={number} />;
    });
  }

  render() {
    return (
      <div className="Board">
        {this.drawPieces()}
      </div>
    );
  }
}

export default Board;

Board.propTypes = {
  pieces: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })).isRequired,
};

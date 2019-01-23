import React, { PureComponent } from 'react';
import 'styles/App.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Board from './Board';
import Drawer from './Drawer';
import Congratulations from './Congratulations';
import Timer from './Timer';
import {
  DIMENSIONS, ENDGAME_DURATION, ERROR_COLOR_DURATION, ERROR_TIME_COST, TIMER_REFRESH_FREQUENCY,
} from '../const';
import { shuffleArray } from '../utilities';


class App extends PureComponent {
  constructor() {
    super();

    this.initialState = {
      time: 0,
      error: false,
      piecesInPlace: [],
      // generate initial array of pieces based on their number
      // and shuffle the array to get random order in the DOM
      piecesInDrawer: shuffleArray(
        [...Array(DIMENSIONS.pieceCount)
          .keys()] // [0..8]
          .map(index => ({ id: index })),
      ),
    };

    this.state = this.initialState;
  }

  componentDidMount() {
    const appElement = document.querySelector('.App');
    if (!appElement) return; // this is to prevent errors in jsdom env

    // optional: override default CSS styles with DIMENSIONS from const.js
    appElement.style.setProperty('--rows', `${DIMENSIONS.rows}`);
    appElement.style.setProperty('--piece-size', `${DIMENSIONS.pieceSize}px`);
    appElement.style.setProperty('--border', `${DIMENSIONS.border}px`);
    appElement.style.setProperty('--separator', `${DIMENSIONS.separator}px`);
  }

  componentWillUnmount() {
    clearTimeout(this.restartTimeout);
    clearInterval(this.timerInterval);
  }

  getCurrentTime() {
    // calculate game time based on time lapsed since beginning and number of made mistakes
    return (Date.now() - this.startTime) + this.errors * ERROR_TIME_COST;
  }

  handleDrag = () => {
    const { time, piecesInDrawer } = this.state;

    // setup starting values and start counting time when first piece is dragged
    if (time === 0 && piecesInDrawer.length > 0) {
      this.startTime = Date.now();
      this.errors = 0;

      this.timerInterval = setInterval(() => {
        this.setState({ time: this.getCurrentTime() });
      }, TIMER_REFRESH_FREQUENCY);
    }
  };

  handleDrop = (droppedPiece) => {
    // run handleInvalidDrop when piece was dropped on wrong target
    if (!droppedPiece) {
      this.handleInvalidDrop();
      return;
    }

    const { piecesInPlace, piecesInDrawer } = this.state;

    // move piece from drawer to board when dropped properly and call endGame if it was last piece
    const newDrawer = piecesInDrawer.filter(({ id }) => id !== droppedPiece.id);
    const newBoard = piecesInPlace.concat([droppedPiece]);

    if (newBoard.length === DIMENSIONS.pieceCount) this.endGame();

    this.setState({
      piecesInDrawer: newDrawer,
      piecesInPlace: newBoard,
    });
  };

  restart = () => {
    // restart the game going back to initial state
    clearTimeout(this.restartTimeout);
    this.setState(this.initialState);
  };

  handleInvalidDrop() {
    // increment errors by one and apply red highlight to timer for short time
    this.errors += 1;
    this.setState({ error: true });

    this.errorTimeout = setTimeout(() => {
      this.setState({ error: false });
      clearTimeout(this.errorTimeout);
    }, ERROR_COLOR_DURATION);
  }

  endGame() {
    // stop timer, display final game time and schedule game restart
    clearInterval(this.timerInterval);
    const finalTime = this.getCurrentTime();
    this.restartTimeout = setTimeout(this.restart, ENDGAME_DURATION);

    this.setState({ time: finalTime });
  }

  render() {
    const {
      piecesInPlace, piecesInDrawer, time, error,
    } = this.state;
    return (
      <div className="App">
        <Timer time={time} error={error} />
        <Board pieces={piecesInPlace} />
        <Drawer
          pieces={piecesInDrawer}
          handleDrop={this.handleDrop}
          handleDrag={this.handleDrag}
        />
        <Congratulations visible={!piecesInDrawer.length} />
      </div>
    );
  }
}

const DNDContext = DragDropContext(HTML5Backend)(App);

export { DNDContext as App, App as AppNoContext };

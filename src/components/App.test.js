import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import { AppNoContext as App } from './App';
import Piece from './Piece';
import { ENDGAME_DURATION, ERROR_COLOR_DURATION } from '../const';


function wrapInTestContext(DecoratedComponent) {
  return DragDropContext(TestBackend)(
    // eslint-disable-next-line react/prefer-stateless-function
    class TestContextContainer extends Component {
      render() {
        return <DecoratedComponent {...this.props} />;
      }
    },
  );
}

test('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    const AppWithTestContext = wrapInTestContext(App);
    wrapper = mount(<AppWithTestContext />);
  });

  afterAll(() => {
    wrapper.unmount();
  });

  describe('drag and drop tests', () => {
    let backend;
    let AppComponent;
    let AppInstance;
    let handlerId;
    let pieceInstance;

    beforeEach(() => {
      backend = wrapper.instance()
        .getManager()
        .getBackend();
      const piece = wrapper.find(Piece)
        .first();
      pieceInstance = piece.instance();
      handlerId = pieceInstance.getHandlerId();
      AppComponent = wrapper.find(App);
      AppInstance = AppComponent.instance();
    });

    it('should call handleDrag when Piece is dragged', () => {
      AppInstance.handleDrag = jest.fn();
      AppInstance
        .forceUpdate();

      backend.simulateBeginDrag([handlerId]);

      expect(AppInstance.handleDrag)
        .toBeCalled();
    });

    it('should set startTime value when first Piece is dragged', () => {
      const testStartTime = Date.now();

      backend.simulateBeginDrag([handlerId]);

      expect(Number.isInteger(AppInstance.startTime))
        .toBe(true);
      expect(AppInstance.startTime)
        .toBeGreaterThanOrEqual(testStartTime);
    });

    it('should call handleDrop with dropped piece when Piece is dropped correctly', () => {
      const targetId = wrapper.find({ index: pieceInstance.props.piece.id })
        .first()
        .instance()
        .getHandlerId();

      AppInstance.handleDrop = jest.fn();
      AppInstance
        .forceUpdate();

      backend.simulateBeginDrag([handlerId]);
      backend.simulateHover([targetId]);
      backend.simulateDrop();
      backend.simulateEndDrag();

      expect(AppInstance.handleDrop)
        .toBeCalledWith({ id: pieceInstance.props.piece.id });
    });

    it('should call handleDrop with false when Piece is dropped incorrectly', () => {
      const pieceId = pieceInstance.props.piece.id;
      const targetIndex = pieceId === 0 ? 8 : pieceId - 1; // target must not match piece

      const targetId = wrapper.find({ index: targetIndex })
        .first()
        .instance()
        .getHandlerId();

      AppInstance.handleDrop = jest.fn();
      AppInstance
        .forceUpdate();

      backend.simulateBeginDrag([handlerId]);
      backend.simulateHover([targetId]);
      backend.simulateDrop();
      backend.simulateEndDrag();

      expect(AppInstance.handleDrop)
        .toBeCalledWith(false);
    });

    it('should not call handleDrop when dropped outside of targets', () => {
      AppInstance.handleDrop = jest.fn();
      AppInstance
        .forceUpdate();

      backend.simulateBeginDrag([handlerId]);
      backend.simulateDrop();
      backend.simulateEndDrag();

      expect(AppInstance.handleDrop)
        .not
        .toBeCalled();
    });
  });

  describe('component methods tests', () => {
    let AppComponent;
    let AppInstance;

    beforeEach(() => {
      AppComponent = wrapper.find(App);
      AppInstance = AppComponent.instance();
    });

    it('should update piecesInPlace and piecesInDrawer when piece is dropped correctly', () => {
      const piecesInDrawerBefore = AppInstance.state.piecesInDrawer.length;

      AppInstance.handleDrop({ id: 1 });
      AppInstance.forceUpdate();

      expect(AppInstance.state.piecesInPlace)
        .toContainEqual({ id: 1 });
      expect(AppInstance.state.piecesInPlace)
        .toHaveLength(1);

      expect(AppInstance.state.piecesInDrawer)
        .not
        .toContainEqual({ id: 1 });
      expect(AppInstance.state.piecesInDrawer)
        .toHaveLength(piecesInDrawerBefore - 1);
    });

    it('should call endGame method when last piece is dropped', () => {
      const endGameMock = jest.fn();

      AppInstance.state.piecesInPlace = [
        { id: 0 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 },
      ];
      AppInstance.state.piecesInDrawer = [{ id: 1 }];

      AppInstance.endGame = endGameMock;
      AppInstance.handleDrop({ id: 1 });
      AppInstance.forceUpdate();

      expect(AppInstance.endGame)
        .toBeCalled();
    });

    it('should call restart from endGame after a timeout ', () => {
      jest.useFakeTimers();

      AppInstance.restart = jest.fn();
      AppInstance.endGame();

      expect(AppInstance.restart)
        .not
        .toHaveBeenCalled();
      jest.runTimersToTime(ENDGAME_DURATION);
      expect(AppInstance.restart)
        .toHaveBeenCalled();
    });

    it('should call handleInvalidDrop when handleDrop is called with false', () => {
      AppInstance.handleInvalidDrop = jest.fn();
      AppInstance.handleDrop(false);

      expect(AppInstance.handleInvalidDrop)
        .toHaveBeenCalled();
    });

    it('should increment this.errors when handleInvalidDrop is called', () => {
      AppInstance.handleDrag();
      const currentErrors = AppInstance.errors;
      AppInstance.handleInvalidDrop();

      expect(AppInstance.errors)
        .toBe(currentErrors + 1);
    });

    it('should set state.error to true for time duration and then set back to false', () => {
      jest.useFakeTimers();

      AppInstance.handleDrag();
      AppInstance.handleInvalidDrop();
      AppInstance.forceUpdate();

      expect(AppInstance.state.error)
        .toBe(true);

      jest.runTimersToTime(ERROR_COLOR_DURATION);
      AppInstance.forceUpdate();

      expect(AppInstance.state.error)
        .toBe(false);
    });

    it('should revert to initial state when restart is called', () => {
      AppInstance.handleDrag();
      AppInstance.handleDrop({ id: 0 });
      expect(AppInstance.state)
        .not
        .toEqual(AppInstance.initialState);

      AppInstance.restart();
      expect(AppInstance.state)
        .toEqual(AppInstance.initialState);
    });
  });
});

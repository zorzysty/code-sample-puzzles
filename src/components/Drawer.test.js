import React from 'react';
import { shallow } from 'enzyme';
import Drawer from './Drawer';
import { getRandomPositions } from '../utilities';
import Piece from './Piece';


const values = [
  {
    top: '40px',
    left: '253px',
  },
  {
    top: '53px',
    left: '182px',
  },
  {
    top: '45px',
    left: '305px',
  },
  {
    top: '31px',
    left: '222px',
  },
  {
    top: '53px',
    left: '323px',
  },
  {
    top: '64px',
    left: '269px',
  },
  {
    top: '73px',
    left: '79px',
  },
  {
    top: '48px',
    left: '266px',
  },
];
const pieces = [
  { id: 0 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 },
];
const handleDragMock = jest.fn();
const handleDropMock = jest.fn();

jest.mock('../utilities');
getRandomPositions.mockReturnValue(values);

describe('Drawer', () => {
  const component = shallow(
    <Drawer
      pieces={pieces}
      handleDrag={handleDragMock}
      handleDrop={handleDropMock}
    />,
  );

  it('should render correctly with pieces', () => {
    expect(component)
      .toMatchSnapshot();
  });

  it('should contain proper Piece components', () => {
    expect(component.containsAllMatchingElements(pieces.map(piece => <Piece piece={piece} />)))
      .toBe(true);

    expect(component.containsMatchingElement(<Piece piece={{ id: 1 }} />))
      .toBe(false);
  });

  it('should render correctly without pieces', () => {
    const emptyComponent = shallow(
      <Drawer pieces={[]} handleDrag={() => {}} handleDrop={() => {}} />,
    );

    expect(emptyComponent.containsMatchingElement(<Piece />))
      .toBe(false);

    expect(emptyComponent)
      .toMatchSnapshot();
  });

  it('should be able to call functions passed as props to Piece components', () => {
    const piece = component.find(Piece).first();

    piece.prop('handleDrag')();
    expect(handleDragMock)
      .toHaveBeenCalledTimes(1);

    piece.prop('handleDrop')();
    expect(handleDropMock)
      .toHaveBeenCalledTimes(1);
  });
});

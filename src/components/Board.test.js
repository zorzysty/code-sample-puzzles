import React from 'react';
import { shallow } from 'enzyme';
import Board from './Board';
import Piece from './Piece';
import Placeholder from './Placeholder';


describe('Board', () => {
  const pieces = [
    { id: 0 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 6 }, { id: 7 }, { id: 8 },
  ];

  const missingPieces = [
    { id: 1 }, { id: 5 },
  ];

  const component = shallow(<Board pieces={pieces} />);

  it('should render correctly with pieces', () => {
    expect(component)
      .toMatchSnapshot();
  });

  it('should render correct Piece components', () => {
    expect(component
      .containsAllMatchingElements(pieces.map(piece => <Piece piece={piece} />)))
      .toBe(true);

    expect(component
      .containsAnyMatchingElements(missingPieces.map(piece => <Piece piece={piece} />)))
      .toBe(false);
  });

  it('should render correct Placeholder components', () => {
    expect(component
      .containsAllMatchingElements(missingPieces.map(piece => <Placeholder index={piece.id} />)))
      .toBe(true);

    expect(component
      .containsAnyMatchingElements(pieces.map(piece => <Placeholder index={piece.id} />)))
      .toBe(false);
  });

  it('should render correctly without pieces', () => {
    const emptyComponent = shallow(<Board pieces={[]} />);

    expect(emptyComponent.containsMatchingElement(<Piece />))
      .toBe(false);

    expect(emptyComponent)
      .toMatchSnapshot();
  });
});

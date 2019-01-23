import React from 'react';
import { mount, shallow } from 'enzyme';
import Piece from './Piece';

describe('Piece', () => {
  it('should render correctly based on passed props', () => {
    const propsArray = [
      {
        key: 1,
        piece: { id: 1 },
        style: {
          top: '30px',
          left: '50px',
        },
      },
      {
        key: 0,
        piece: { id: 0 },
        style: {
          top: '70px',
          left: '10px',
        },
      },
    ];

    propsArray.forEach((props) => {
      const component = shallow(
        <Piece
          handleDrop={() => {}}
          handleDrag={() => {}}
          {...props}
        />,
      );

      expect(component)
        .toMatchSnapshot();

      component.unmount();
    });
  });

  it('should call functions passed in props', () => {
    const handleDragMock = jest.fn();
    const handleDropMock = jest.fn();

    const piece = mount(<Piece
      key={1}
      piece={{ id: 1 }}
      handleDrop={handleDropMock}
      handleDrag={handleDragMock}
    />);

    piece.prop('handleDrag')();
    expect(handleDragMock)
      .toHaveBeenCalledTimes(1);

    piece.prop('handleDrop')();
    expect(handleDropMock)
      .toHaveBeenCalledTimes(1);

    piece.unmount();
  });
});

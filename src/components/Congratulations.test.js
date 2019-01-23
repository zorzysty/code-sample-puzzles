import React from 'react';
import renderer from 'react-test-renderer';
import Congratulations from './Congratulations';


describe('Congratulations component', () => {
  it('should render correctly based on passed props', () => {
    const propsArray = [
      {
        visible: false,
      },
      {
        visible: true,
      },
    ];

    propsArray.forEach((props) => {
      const component = renderer.create(<Congratulations {...props} />);
      expect(component.toJSON())
        .toMatchSnapshot();
    });
  });
});

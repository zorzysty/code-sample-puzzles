import React from 'react';
import Timer from 'components/Timer';
import renderer from 'react-test-renderer';


describe('Timer component', () => {
  it('should render correctly based on passed props', () => {
    const propsArray = [
      {
        time: 12345,
        error: false,
      },
      {
        time: 15,
        error: true,
      },
      {
        time: 0,
        error: false,
      },
    ];

    propsArray.forEach((props) => {
      const component = renderer.create(<Timer {...props} />);
      const tree = component.toJSON();
      expect(tree)
        .toMatchSnapshot();
    });
  });
});

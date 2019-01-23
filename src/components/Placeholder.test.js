import React from 'react';
import { shallow } from 'enzyme';
import Placeholder from './Placeholder';


describe('Placeholder', () => {
  it('should render correctly based on passed props', () => {
    const propsArray = [
      {
        key: 0,
        index: 0,
      },
      {
        key: 6,
        index: 6,
      },
    ];

    propsArray.forEach((props) => {
      const component = shallow(<Placeholder {...props} />);

      expect(component)
        .toMatchSnapshot();
    });
  });
});

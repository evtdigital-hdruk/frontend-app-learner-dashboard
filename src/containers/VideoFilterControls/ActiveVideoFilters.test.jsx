import { shallow } from '@edx/react-unit-test-utils';

import { FilterKeys } from 'data/constants/app';
import ActiveVideoFilters from './ActiveVideoFilters';

describe('ActiveVideoFilters', () => {
  const props = {
    filters: Object.values(FilterKeys),
    handleRemoveFilter: jest.fn().mockName('handleRemoveFilter'),
  };
  describe('snapshot', () => {
    test('renders', () => {
      const wrapper = shallow(<ActiveVideoFilters {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();
    });
  });
});

import { shallow } from '@edx/react-unit-test-utils';

import track from 'tracking';
import { reduxHooks } from 'hooks';
import { htmlProps } from 'data/constants/htmlKeys';
import useActionDisabledState from '../hooks';
import UpgradeButton from './UpgradeButton';

jest.mock('tracking', () => ({
  course: {
    upgradeClicked: jest.fn().mockName('segment.trackUpgradeClicked'),
  },
}));

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCourseRunData: jest.fn(),
    useTrackCourseEvent: jest.fn(
      (eventName, cardId, upgradeUrl) => ({ trackCourseEvent: { eventName, cardId, upgradeUrl } }),
    ),
  },
}));
jest.mock('../hooks', () => jest.fn(() => ({ disableUpgradeCourse: false })));
jest.mock('./ActionButton', () => 'ActionButton');

describe('UpgradeButton', () => {
  const props = {
    cardId: 'cardId',
  };
  const upgradeUrl = 'upgradeUrl';
  reduxHooks.useCardCourseRunData.mockReturnValue({ upgradeUrl });
  describe('snapshot', () => {
    test('can upgrade', () => {
      const wrapper = shallow(<UpgradeButton {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.prop(htmlProps.disabled)).toEqual(false);
      expect(wrapper.prop(htmlProps.onClick)).toEqual(reduxHooks.useTrackCourseEvent(
        track.course.upgradeClicked,
        props.cardId,
        upgradeUrl,
      ));
    });
    test('cannot upgrade', () => {
      useActionDisabledState.mockReturnValueOnce({ disableUpgradeCourse: true });
      const wrapper = shallow(<UpgradeButton {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
    });
  });
});

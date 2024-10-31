import { shallow } from 'enzyme';

import track from 'tracking';
import { htmlProps } from 'data/constants/htmlKeys';
import { reduxHooks } from 'hooks';
import useActionDisabledState from '../hooks';
import ViewCourseButton from './ViewCourseButton';

jest.mock('tracking', () => ({
  course: {
    enterCourseClicked: jest.fn().mockName('segment.enterCourseClicked'),
  },
}));

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCourseRunData: jest.fn(() => ({ homeUrl: 'homeUrl' })),
    useTrackCourseEvent: jest.fn(
      (eventName, cardId, upgradeUrl) => ({ trackCourseEvent: { eventName, cardId, upgradeUrl } }),
    ),
  },
}));
jest.mock('../hooks', () => jest.fn(() => ({ disableViewCourse: false })));
jest.mock('./ActionButton', () => 'ActionButton');

const defaultProps = { cardId: 'cardId' };
const homeUrl = 'homeUrl';

describe('ViewCourseButton', () => {
  test('learner can view course', () => {
    const wrapper = shallow(<ViewCourseButton {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop(htmlProps.onClick)).toEqual(reduxHooks.useTrackCourseEvent(
      track.course.enterCourseClicked,
      defaultProps.cardId,
      homeUrl,
    ));
    expect(wrapper.prop(htmlProps.disabled)).toEqual(false);
  });
  test('learner cannot view course', () => {
    useActionDisabledState.mockReturnValueOnce({ disableViewCourse: true });
    const wrapper = shallow(<ViewCourseButton {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
  });
});

import { StrictDict } from 'utils';
import { FilterKeys, SortKeys } from 'data/constants/app';

import simpleSelectors from './simpleSelectors';
import * as module from './currentVideoList';

export const sortFn = (transform, { reverse }) => (v1, v2) => {
  const [a, b] = [v1, v2].map(transform);
  if (a === b) { return 0; }
  return ((a > b) ? 1 : -1) * (reverse ? -1 : 1);
};

export const videoFiltersList = StrictDict({
  [FilterKeys.notEnrolled]: (course) => !course.enrollment.isEnrolled,
  [FilterKeys.done]: (course) => course.courseRun !== null && course.courseRun.isArchived,
  [FilterKeys.upgraded]: (course) => course.enrollment.isVerified,
  [FilterKeys.inProgress]: (course) => course.enrollment.hasStarted,
  [FilterKeys.notStarted]: (course) => !course.enrollment.hasStarted,
});

export const transforms = StrictDict({
  [SortKeys.enrolled]: ({ enrollment }) => new Date(enrollment.lastEnrolled),
  [SortKeys.title]: ({ course }) => course.courseName.toLowerCase(),
});

export const courseFilterFn = videoFilters => (videoFilters.length
  ? course => videoFilters.reduce((match, filter) => match && videoFiltersList[filter](course), true)
  : () => true);

export const currentVideoList = (allCourses, {
  sortBy,
  videoFilters,
}) => allCourses
  .filter((course) => course.course.courseType === 'video')
  .filter(module.courseFilterFn(videoFilters))
  .sort(module.sortFn(transforms[sortBy], { reverse: sortBy === SortKeys.enrolled }));

export const visibleVideoList = (state, {
  sortBy,
  videoFilters,
  pageSize,
}) => {
  const courses = Object.values(simpleSelectors.courseData(state));
  const list = module.currentVideoList(courses, { sortBy, videoFilters });
  const videoPageNumber = simpleSelectors.videoPageNumber(state);

  if (pageSize === 0) {
    return {
      visible: list,
      numPages: 1,
    };
  }
  return {
    visibleVideoList: list.slice((videoPageNumber - 1) * pageSize, videoPageNumber * pageSize),
    numPages: Math.ceil(list.length / pageSize),
  };
};

export default visibleVideoList;

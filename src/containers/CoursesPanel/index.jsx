import React from 'react';

import { reduxHooks } from 'hooks';
import CourseListHeadingSlot from 'plugin-slots/CourseListHeadingSlot';
import CourseListSlot from 'plugin-slots/CourseListSlot';
import NoCoursesViewSlot from 'plugin-slots/NoCoursesViewSlot';

import { useCourseListData } from './hooks';

import './index.scss';

/**
 * Renders the list of CourseCards, as well as the controls (CourseFilterControls) for modifying the list.
 * Also houses the NoCoursesView to display if the user hasn't enrolled in any courses.
 * @returns List of courses as CourseCards or empty state
*/
export const CoursesPanel = () => {
  const hasCourses = reduxHooks.useHasCourses();
  const courseListData = useCourseListData();
  return (
    <div className="course-list-container">
      <CourseListHeadingSlot filterOptions={courseListData.filterOptions} />
      {hasCourses ? <CourseListSlot courseListData={courseListData} /> : <NoCoursesViewSlot />}
    </div>
  );
};

CoursesPanel.propTypes = {};

export default CoursesPanel;

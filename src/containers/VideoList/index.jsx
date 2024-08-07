import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Pagination } from '@edx/paragon';

import { reduxHooks } from 'hooks';
import {
  ActiveCourseFilters,
  CourseFilterControls,
} from 'containers/CourseFilterControls';
import VideoCard from 'containers/VideoCard';
import NoCoursesView from './NoCoursesView';

import { useVideoListData, useIsCollapsed } from './hooks';

import messages from './messages';

import './index.scss';

export const VideoList = () => {
  const { formatMessage } = useIntl();
  const hasCourses = reduxHooks.useHasCourses();
  const {
    filterOptions,
    setVideoPageNumber,
    numPages,
    showFilters,
    visibleVideoList,
  } = useVideoListData();
  const isCollapsed = useIsCollapsed();
  const coursesList = visibleVideoList.filter((course) => course.course.courseType === 'video');
  return (
    <div className="course-list-container">
      <div className="course-list-heading-container">
        <h2 className="course-list-title">{formatMessage(messages.myVideos)}</h2>
        <div className="course-filter-controls-container">
          <CourseFilterControls {...filterOptions} />
        </div>
      </div>
      {hasCourses
        ? (
          <>
            {showFilters && (
              <div id="course-list-active-filters-container">
                <ActiveCourseFilters {...filterOptions} />
              </div>
            )}
            <div className="d-flex flex-column flex-grow-1 container">
              <div className="row">
                {coursesList.map(({ cardId }) => (
                  <VideoCard key={cardId} cardId={cardId} />
                ))}
              </div>
              {numPages > 1 && (
                <Pagination
                  variant={isCollapsed ? 'reduced' : 'secondary'}
                  paginationLabel="Course List"
                  className="mx-auto mb-2"
                  pageCount={numPages}
                  onPageSelect={setVideoPageNumber}
                />
              )}
            </div>
          </>
        ) : (
          <NoCoursesView />
        )}
    </div>
  );
};

VideoList.propTypes = {};

export default VideoList;

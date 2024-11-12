import React from 'react';
import PropTypes from 'prop-types';

import { Pagination } from '@openedx/paragon';
import {
  ActiveVideoFilters,
} from 'containers/VideoFilterControls';
import VideoCard from 'containers/VideoCard';

import { useIsCollapsed } from './hooks';

export const VideoList = ({
  filterOptions, setVideoPageNumber, numPages, showFilters, visibleVideoList,
}) => {
  const isCollapsed = useIsCollapsed();
  return (
    <>
      {showFilters && (
        <div id="course-list-active-filters-container">
          <ActiveVideoFilters {...filterOptions} />
        </div>
      )}
      <div className="d-flex flex-column flex-grow-1 container">
        <div className="row">
          {visibleVideoList.map(({ cardId }) => (
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
  );
};

VideoList.propTypes = {
  showFilters: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  visibleVideoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  filterOptions: PropTypes.object.isRequired,
  numPages: PropTypes.number.isRequired,
  setVideoPageNumber: PropTypes.func.isRequired,
};

export default VideoList;

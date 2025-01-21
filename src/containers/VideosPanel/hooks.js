import React from 'react';

import queryString from 'query-string';

import { ListPageSize, SortKeys } from 'data/constants/app';
import { reduxHooks } from 'hooks';
import { StrictDict } from 'utils';

import * as module from './hooks';

export const state = StrictDict({
  sortBy: (val) => React.useState(val), // eslint-disable-line
});

/**
 * Filters are fetched from the store and used to generate a list of "visible" courses.
 * Other values returned and used for the layout of the CoursesPanel component are:
 * the current page number, the sorting method, and whether or not to enable filters and pagination.
 *
 * @returns data for the CoursesPanel component
 */
export const useVideoListData = () => {
  const videoFilters = reduxHooks.useVideoFilters();
  const removeVideoFilter = reduxHooks.useRemoveVideoFilter();
  const videoPageNumber = reduxHooks.useVideoPageNumber();
  const setVideoPageNumber = reduxHooks.useSetVideoPageNumber();

  const [sortBy, setSortBy] = module.state.sortBy(SortKeys.enrolled);

  const querySearch = queryString.parse(window.location.search, { parseNumbers: true });

  const { numPages, visibleVideoList } = reduxHooks.useCurrentVideoList({
    sortBy,
    videoFilters,
    pageSize: querySearch?.disable_pagination === 1 ? 0 : ListPageSize,
  });

  const handleRemoveFilter = (filter) => () => removeVideoFilter(filter);

  return {
    videoPageNumber,
    numPages,
    setVideoPageNumber,
    visibleVideoList,
    filterOptions: {
      sortBy,
      setSortBy,
      videoFilters,
      handleRemoveFilter,
    },
    showFilters: videoFilters.length > 0,
  };
};

export default useVideoListData;

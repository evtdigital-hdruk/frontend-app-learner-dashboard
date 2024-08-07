import React from 'react';

import { useCheckboxSetValues, useWindowSize, breakpoints } from '@edx/paragon';
import queryString from 'query-string';

import { ListPageSize, SortKeys } from 'data/constants/app';
import { reduxHooks } from 'hooks';
import { StrictDict } from 'utils';

import * as module from './hooks';

export const useIsCollapsed = () => {
  const { width } = useWindowSize();
  return width < breakpoints.medium.maxWidth;
};

export const state = StrictDict({
  sortBy: (val) => React.useState(val), // eslint-disable-line
});

export const useVideoListData = () => {
  const [filters, setFilters] = useCheckboxSetValues([]);
  const [sortBy, setSortBy] = module.state.sortBy(SortKeys.enrolled);
  const videoPageNumber = reduxHooks.useVideoPageNumber();
  const querySearch = queryString.parse(window.location.search, { parseNumbers: true });

  const { numPages, visible } = reduxHooks.useCurrentVideoList({
    sortBy,
    filters,
    pageSize: querySearch?.disable_pagination === 1 ? 0 : ListPageSize,
  });

  const handleRemoveFilter = (filter) => () => setFilters.remove(filter);
  const setVideoPageNumber = reduxHooks.useSetVideoPageNumber();

  return {
    videoPageNumber,
    numPages,
    setVideoPageNumber,
    visibleVideoList: visible,
    filterOptions: {
      sortBy,
      setSortBy,
      filters,
      setFilters,
      handleRemoveFilter,
    },
    showFilters: filters.length > 0,
  };
};

export default useVideoListData;

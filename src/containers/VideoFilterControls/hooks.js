import React from 'react';
import { useToggle } from '@openedx/paragon';

import { StrictDict } from 'utils';
import track from 'tracking';
import { reduxHooks } from 'hooks';

import * as module from './hooks';

export const state = StrictDict({
  target: (val) => React.useState(val), // eslint-disable-line
});

/**
 * Sets up a toggle for the modal as well as helper functions for handling changes to the form controls.
 *
 * @param {array} filters Currently active video filters
 * @param {function} setSortBy Set function for sorting the video list
 * @returns {object} data and functions for managing the VideoFilterControls component
 */
export const useVideoFilterControlsData = ({
  filters,
  setSortBy,
}) => {
  const [isOpen, toggleOpen, toggleClose] = useToggle(false);
  const [target, setTarget] = module.state.target(null);

  const addFilter = reduxHooks.useAddVideoFilter();
  const removeFilter = reduxHooks.useRemoveVideoFilter();

  const handleFilterChange = ({ target: { checked, value } }) => {
    const update = checked ? addFilter : removeFilter;
    update(value);
  };
  const handleSortChange = ({ target: { value } }) => {
    setSortBy(value);
  };

  const open = () => {
    track.filter.filterClicked();
    toggleOpen();
  };

  const close = () => {
    track.filter.filterOptionSelected(filters);
    toggleClose();
  };

  return {
    isOpen,
    open,
    close,
    target,
    setTarget,
    handleFilterChange,
    handleSortChange,
  };
};

export default useVideoFilterControlsData;

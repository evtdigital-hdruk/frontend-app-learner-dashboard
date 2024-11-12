import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

import { Button, Chip } from '@openedx/paragon';
import { CloseSmall } from '@openedx/paragon/icons';
import { reduxHooks } from 'hooks';

import messages from './messages';
import './index.scss';

export const ActiveVideoFilters = ({
  videoFilters,
  handleRemoveFilter,
}) => {
  const { formatMessage } = useIntl();
  const clearFilters = reduxHooks.useClearVideoFilters();
  return (
    <div id="course-list-active-filters">
      {videoFilters.map(filter => (
        <Chip
          key={filter}
          iconAfter={CloseSmall}
          onClick={handleRemoveFilter(filter)}
        >
          {formatMessage(messages[filter])}
        </Chip>
      ))}
      <Button variant="link" onClick={clearFilters}>
        {formatMessage(messages.clearAll)}
      </Button>
    </div>
  );
};
ActiveVideoFilters.propTypes = {
  videoFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleRemoveFilter: PropTypes.func.isRequired,
};

export default ActiveVideoFilters;

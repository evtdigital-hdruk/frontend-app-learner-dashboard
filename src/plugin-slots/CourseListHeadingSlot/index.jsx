import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { PluginSlot } from '@openedx/frontend-plugin-framework';

import {
  CourseFilterControls,
} from 'containers/CourseFilterControls';

import messages from 'containers/CoursesPanel/messages';

const CourseListHeadingSlot = ({ filterOptions }) => {
  const { formatMessage } = useIntl();
  return (
    <PluginSlot id="course_list_heading_slot" pluginProps={{ filterOptions }}>
      <div className="course-list-heading-container">
        <h2 className="course-list-title">{formatMessage(messages.myCourses)}</h2>
        <div className="course-filter-controls-container">
          <CourseFilterControls {...filterOptions} />
        </div>
      </div>
    </PluginSlot>
  );
};

CourseListHeadingSlot.propTypes = {
  filterOptions: PropTypes.shape({}).isRequired,
};

export default CourseListHeadingSlot;

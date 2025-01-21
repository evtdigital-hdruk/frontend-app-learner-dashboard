import React from 'react';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { useIntl } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';
import {
  VideoFilterControls,
} from 'containers/VideoFilterControls';
import NoVideosView from './NoVideosView';

import VideoList from './VideoList';

import { useVideoListData } from './hooks';

import messages from './messages';

import './index.scss';

/**
 * Renders the list of VideoCards, as well as the controls (VideoFilterControls) for modifying the list.
 * Also houses the NoVideosView to display if the user hasn't enrolled in any courses.
 * @returns List of courses as VideoCards or empty state
*/
export const VideosPanel = () => {
  const { formatMessage } = useIntl();
  const hasCourses = reduxHooks.useHasCourses();
  const videoListData = useVideoListData();
  return (
    <div className="course-list-container">
      <div className="course-list-heading-container">
        <h2 className="course-list-title">{formatMessage(messages.myVideos)}</h2>
        <div className="course-filter-controls-container">
          <VideoFilterControls {...videoListData.filterOptions} />
        </div>
      </div>
      {hasCourses ? (
        <PluginSlot
          id="video_list"
        >
          <VideoList {...videoListData} />
        </PluginSlot>
      ) : (
        <PluginSlot
          id="no_videos_view"
        >
          <NoVideosView />
        </PluginSlot>
      )}
    </div>
  );
};

VideosPanel.propTypes = {};

export default VideosPanel;

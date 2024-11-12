import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Button } from '@openedx/paragon';

import urls from 'data/services/lms/urls';
import { reduxHooks } from 'hooks';

import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import { useIsCollapsed, findCoursesNavClicked } from '../hooks';
import messages from '../messages';
import BrandLogo from '../BrandLogo';

export const ExpandedHeader = () => {
  const { formatMessage } = useIntl();
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();
  const isCollapsed = useIsCollapsed();

  const exploreCoursesClick = findCoursesNavClicked(
    urls.baseAppUrl(courseSearchUrl),
  );

  if (isCollapsed) {
    return null;
  }

  return (
    !isCollapsed && (
    <header className="d-flex shadow-sm align-items-center learner-variant-header pl-4 max-w-xl mx-auto">
      <div className="flex-grow-1 d-flex align-items-center">
        <BrandLogo />

        <Button
          as="a"
          href={urls.dashboardUrl()}
          variant="inverse-primary"
          className="p-4 course-link"
        >
          {formatMessage(messages.dashboard)}
        </Button>
        <Button
          as="a"
          href={urls.baseAppUrl(courseSearchUrl)}
          variant="inverse-primary"
          className="p-4"
          onClick={exploreCoursesClick}
        >
          {formatMessage(messages.discoverNew)}
        </Button>
        <span className="flex-grow-1" />
        <Button
          as="a"
          href={urls.helpUrl()}
          variant="inverse-primary"
          className="p-4"
        >
          {formatMessage(messages.help)}
        </Button>
      </div>

      <AuthenticatedUserDropdown />
    </header>
    ));
};

ExpandedHeader.propTypes = {};

export default ExpandedHeader;

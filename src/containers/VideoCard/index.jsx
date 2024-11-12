import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '@openedx/paragon';

import { useIsCollapsed } from './hooks';
import CourseCardImage from './components/CourseCardImage';
import CourseCardMenu from './components/CourseCardMenu';
import CourseCardActions from './components/CourseCardActions';
import CourseCardDetails from './components/CourseCardDetails';
import CourseCardTitle from './components/CourseCardTitle';

import './VideoCard.scss';

export const VideoCard = ({
  cardId,
}) => {
  const isCollapsed = useIsCollapsed();
  const orientation = isCollapsed ? 'vertical' : 'horizontal';
  return (
    <div className="mb-4.5 course-card col-sm-6 col-2xl-4" id={cardId} data-testid="CourseCard">
      <Card orientation={orientation}>
        <div className="d-flex flex-column w-100">
          <CourseCardImage className="w-100" cardId={cardId} orientation={orientation} />
          <Card.Body>
            <Card.Header
              title={<CourseCardTitle cardId={cardId} />}
              actions={<CourseCardMenu cardId={cardId} />}
              className="mt-0"
              size="sm"
            />
            <Card.Section className="py-0">
              <CourseCardDetails cardId={cardId} />
            </Card.Section>
            <Card.Footer orientation="horizontal">
              <CourseCardActions cardId={cardId} />
            </Card.Footer>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};
VideoCard.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default VideoCard;

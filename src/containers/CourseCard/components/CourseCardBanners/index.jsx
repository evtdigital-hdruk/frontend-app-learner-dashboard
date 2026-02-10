import React from 'react';
import PropTypes from 'prop-types';

import { reduxHooks } from 'hooks';

import CourseBannerSlot from 'plugin-slots/CourseBannerSlot';
import CertificateBannerSlot from 'plugin-slots/CertificateBannerSlot';
import CreditBanner from './CreditBanner';
import EntitlementBanner from './EntitlementBanner';
import RelatedProgramsBanner from './RelatedProgramsBanner';

export const CourseCardBanners = ({ cardId }) => {
  const { isEnrolled } = reduxHooks.useCardEnrollmentData(cardId);
  return (
    <div className="course-card-banners" data-testid="CourseCardBanners">
      <RelatedProgramsBanner cardId={cardId} />
      <CourseBannerSlot cardId={cardId} />
      <EntitlementBanner cardId={cardId} />
      {isEnrolled && <CertificateBannerSlot cardId={cardId} />}
      {isEnrolled && <CreditBanner cardId={cardId} />}
    </div>
  );
};
CourseCardBanners.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardBanners;

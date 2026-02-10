import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import CertificateBanner from 'containers/CourseCard/components/CourseCardBanners/CertificateBanner';

const CertificateBannerSlot = ({ cardId }) => (
  <PluginSlot
    id="certificate_banner_slot"
    pluginProps={{
      cardId,
    }}
  >
    <CertificateBanner
      cardId={cardId}
    />
  </PluginSlot>
);

CertificateBannerSlot.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CertificateBannerSlot;

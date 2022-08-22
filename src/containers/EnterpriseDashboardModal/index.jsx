import React from 'react';
// import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import {
  ModalDialog, ActionRow, Button,
} from '@edx/paragon';

import messages from './messages';
import useEnterpriseDashboardHook from './hooks';

export const EnterpriseDashboardModal = () => {
  const { formatMessage } = useIntl();
  const {
    showModal,
    handleClick,
    mostRecentDashboard,
  } = useEnterpriseDashboardHook();
  return (
    <ModalDialog
      isOpen={showModal}
      onClose={handleClick}
      hasCloseButton={false}
      title=""
    >
      <div
        className="bg-white p-3 rounded shadow"
        style={{ textAlign: 'start' }}
      >
        <h4>
          {formatMessage(messages.enterpriseDialogHeader, {
            label: mostRecentDashboard.label,
          })}
        </h4>
        <p>
          {formatMessage(messages.enterpriseDialogBody, {
            label: mostRecentDashboard.label,
          })}
        </p>
        <ActionRow>
          <Button variant="tertiary" onClick={handleClick}>
            {formatMessage(messages.enterpriseDialogDismissButton)}
          </Button>
          <Button type="a" href={mostRecentDashboard.url}>
            {formatMessage(messages.enterpriseDialogConfirmButton)}
          </Button>
        </ActionRow>
      </div>
    </ModalDialog>
  );
};

EnterpriseDashboardModal.propTypes = {};

export default EnterpriseDashboardModal;
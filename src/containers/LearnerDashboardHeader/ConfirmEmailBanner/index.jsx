/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Image,
  MarketingModal,
  ModalDialog,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import confirmEmailSVG from 'assets/confirm-email.svg';
import messages from './messages';
import './ConfirmEmailBanner.scss';
import useConfirmEmailBannerData from './hooks';
import { getCookie, removeCookie } from '../../../utils/cookies';

export const ConfirmEmailBanner = () => {
  const {
    isNeeded,
    showConfirmModal,
    closeConfirmModal,
    openConfirmModalButtonClick,
    sendConfirmEmail,
  } = useConfirmEmailBannerData();
  const { formatMessage } = useIntl();
  const openModalSendEmail = useRef();
  const [waitForResend, setWaitForResend] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (isNeeded && !openModalSendEmail.current) {
      openConfirmModalButtonClick();
      openModalSendEmail.current = true;
    }
  }, [isNeeded, openConfirmModalButtonClick]);

  useEffect(() => {
    let timer;
    if (waitForResend && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setWaitForResend(false);
    }
    return () => clearTimeout(timer);
  }, [waitForResend, timeLeft]);

  const resendVerificationEmailClick = () => {
    sendConfirmEmail();
    setWaitForResend(true);
    setTimeLeft(60);
  };

  const showAccountActivationCookie = getCookie('show-account-activation-popup');

  if (showAccountActivationCookie && isNeeded === false) {
    removeCookie('show-account-activation-popup');
  }

  if (!isNeeded) { return null; }

  return (
    <MarketingModal
      title=""
      isOpen={showConfirmModal}
      onClose={closeConfirmModal}
      isBlocking
      hasCloseButton={false}
      heroNode={(
        <ModalDialog.Hero className="bg-gray-300">
          <Image
            className="m-auto"
            src={confirmEmailSVG}
            alt={formatMessage(messages.confirmEmailImageAlt)}
          />
        </ModalDialog.Hero>
      )}
      footerNode={(
        <Button className="mx-auto my-3" variant="danger" disabled={waitForResend} onClick={resendVerificationEmailClick}>
          {
            waitForResend
              ? `${formatMessage(messages.resendConfirmEmailButton)} (${timeLeft}s)`
              : formatMessage(messages.resendConfirmEmailButton)
          }
        </Button>
      )}
    >
      <h1 className="text-center p-3">{formatMessage(messages.confirmEmailModalHeader)}</h1>
      <p className="text-center">{formatMessage(messages.confirmEmailModalBody)}</p>
    </MarketingModal>
  );
};
ConfirmEmailBanner.propTypes = {};

export default ConfirmEmailBanner;

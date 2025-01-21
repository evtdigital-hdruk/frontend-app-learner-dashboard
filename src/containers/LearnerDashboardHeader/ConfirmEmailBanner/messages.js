import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  confirmNowButton: {
    id: 'learnerDashboard.confirmEmailBanner',
    description: 'Button for sending confirm email and open modal',
    defaultMessage: 'Confirm Now',
  },
  confirmEmailTextReminderBanner: {
    id: 'learnerDashboard.confirmEmailTextReminderBanner',
    description: 'Text for reminding user to confirm email',
    defaultMessage: 'Remember to confirm your email so that you can keep learning! {confirmNowButton}.',
  },
  resendConfirmEmailButton: {
    id: 'learnerDashboard.resendConfirmEmailButton',
    description: 'Button to resend confirmation email',
    defaultMessage: 'Resend verification email',
  },
  verifiedConfirmEmailButton: {
    id: 'learnerDashboard.verifiedConfirmEmailButton',
    description: 'Button for verified confirming email',
    defaultMessage: 'I\'ve confirmed my email',
  },
  confirmEmailModalHeader: {
    id: 'learnerDashboard.confirmEmailModalHeader',
    description: 'title for confirming email modal',
    defaultMessage: 'Confirm your email',
  },
  confirmEmailModalBody: {
    id: 'learnerDashboard.confirmEmailModalBody',
    description: 'text hint for confirming email modal',
    defaultMessage: 'We\'ve sent you an email to verify your account. Please check your inbox to confirm and keep learning.',
  },
  confirmEmailImageAlt: {
    id: 'learnerDashboard.confirmEmailImageAlt',
    description: 'text alt confirm email image',
    defaultMessage: 'confirm email background',
  },
  emailConfirmedButton: {
    id: 'learnerDashboard.emailConfirmedButton',
    description: 'Button to say that the user has confirmed their email',
    defaultMessage: 'I\'ve confirmed my email',
  },
});

export default messages;

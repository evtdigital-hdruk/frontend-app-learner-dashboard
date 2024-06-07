import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  confirmNowButton: {
    id: 'leanerDashboard.confirmEmailBanner',
    description: 'Button for sending confirm email and open modal',
    defaultMessage: 'Confirm Now',
  },
  confirmEmailTextReminderBanner: {
    id: 'leanerDashboard.confirmEmailTextReminderBanner',
    description: 'Text for reminding user to confirm email',
    defaultMessage: 'Remember to confirm your email so that you can keep learning on edX! {confirmNowButton}.',
  },
  resendConfirmEmailButton: {
    id: 'leanerDashboard.resendConfirmEmailButton',
    description: 'Button to resend confirmation email',
    defaultMessage: 'Resend verification email',
  },
  verifiedConfirmEmailButton: {
    id: 'leanerDashboard.verifiedConfirmEmailButton',
    description: 'Button for verified confirming email',
    defaultMessage: 'I\'ve confirmed my email',
  },
  confirmEmailModalHeader: {
    id: 'leanerDashboard.confirmEmailModalHeader',
    description: 'title for confirming email modal',
    defaultMessage: 'Confirm your email',
  },
  confirmEmailModalBody: {
    id: 'leanerDashboard.confirmEmailModalBody',
    description: 'text hint for confirming email modal',
    defaultMessage: 'We\'ve sent you an email to verify your account. Please check your inbox to confirm and keep learning.',
  },
  confirmEmailImageAlt: {
    id: 'leanerDashboard.confirmEmailImageAlt',
    description: 'text alt confirm email image',
    defaultMessage: 'confirm email background',
  },
});

export default messages;

import { StrictDict } from 'utils';

import { getConfig } from '@edx/frontend-platform';

export const getEcommerceUrl = () => getConfig().ECOMMERCE_BASE_URL;

const getBaseUrl = () => getConfig().LMS_BASE_URL;
const getMarketingUrl = () => getConfig().MARKETING_SITE_BASE_URL;

export const getApiUrl = () => (`${getConfig().LMS_BASE_URL}/api`);

const getInitApiUrl = () => (`${getApiUrl()}/learner_home/init`);

const event = () => `${getBaseUrl()}/event`;
const courseUnenroll = () => `${getBaseUrl()}/change_enrollment`;
const updateEmailSettings = () => `${getApiUrl()}/change_email_settings`;
const entitlementEnrollment = (uuid) => `${getApiUrl()}/entitlements/v1/entitlements/${uuid}/enrollments`;

// if url is null or absolute, return it as is
export const updateUrl = (base, url) => ((url == null || url.startsWith('http://') || url.startsWith('https://')) ? url : `${base}${url}`);

export const baseAppUrl = (url) => updateUrl(getBaseUrl(), url);
export const learningMfeUrl = (url) => updateUrl(getConfig().LEARNING_BASE_URL, url);
export const marketingBaseUrl = (url) => updateUrl(getMarketingUrl(), url);

// static view url
const dashboardUrl = () => baseAppUrl('/');
const programsUrl = () => baseAppUrl('/dashboard/programs');
const helpUrl = () => marketingBaseUrl('/help');

export const creditPurchaseUrl = (courseId) => `${getEcommerceUrl()}/credit/checkout/${courseId}/`;
export const creditRequestUrl = (providerId) => `${getApiUrl()}/credit/v1/providers/${providerId}/request/`;

export default StrictDict({
  getApiUrl,
  baseAppUrl,
  marketingBaseUrl,
  courseUnenroll,
  creditPurchaseUrl,
  creditRequestUrl,
  entitlementEnrollment,
  event,
  getInitApiUrl,
  learningMfeUrl,
  dashboardUrl,
  programsUrl,
  helpUrl,
  updateEmailSettings,
});

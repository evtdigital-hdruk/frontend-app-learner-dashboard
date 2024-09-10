import Cookies from 'universal-cookie';
import { getConfig } from '@edx/frontend-platform';

export function setCookie(cookieName, cookieValue, cookieExpiry) {
  const cookies = new Cookies();
  const options = { domain: getConfig().SESSION_COOKIE_DOMAIN, path: '/' };
  if (cookieExpiry) {
    options.expires = new Date(Date.now() + cookieExpiry * 864e5);
  }
  cookies.set(cookieName, cookieValue, options);
}

export function getCookie(cookieName) {
  const cookies = new Cookies();
  return cookies.get(cookieName);
}

export function removeCookie(cookieName) {
  const cookies = new Cookies();
  const options = { domain: getConfig().SESSION_COOKIE_DOMAIN, path: '/' };
  return cookies.remove(cookieName, options);
}

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const GoogleTagManager = ({ gtmId }) => {
  const isGtmLoaded = useRef(false);

  useEffect(() => {
    if (!isGtmLoaded.current) {
      isGtmLoaded.current = true;
      const noscript = document.createElement('noscript');
      noscript.innerHTML = `
        <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>
      `;
      document.body.insertBefore(noscript, document.body.firstChild);
      return () => {
        if (noscript && noscript.parentNode) {
          noscript.parentNode.removeChild(noscript);
        }
      };
    }
    return null;
  }, [gtmId]);

  return (
    <Helmet>
      <script>
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}
      </script>
    </Helmet>
  );
};

GoogleTagManager.propTypes = {
  gtmId: PropTypes.string.isRequired,
};

export default GoogleTagManager;

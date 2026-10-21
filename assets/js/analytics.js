(function () {
  'use strict';

  // Preview/local visits must not be sent to the production GA4 property.
  if (!['scottshapiro.com', 'www.scottshapiro.com'].includes(window.location.hostname)) return;

  var measurementId = document.currentScript.dataset.measurementId;
  if (!/^G-[A-Z0-9]+$/.test(measurementId || '')) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);
  var loader = document.createElement('script');
  loader.async = true;
  loader.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
  document.head.appendChild(loader);
}());

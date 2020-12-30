"use strict";

exports.onRouteUpdate = function (_, pluginOptions) {
  if (process.env.NODE_ENV === "production" || pluginOptions.includeInDevelopment) {
    setTimeout(function () {
      var data = pluginOptions.dataLayerName ? window[pluginOptions.dataLayerName] : window.dataLayer;
      var eventName = pluginOptions.routeChangeEventName ? pluginOptions.routeChangeEventName : "gatsby-route-change";
      utag.view({
        event: eventName
      });
    }, 50);
  }
};  

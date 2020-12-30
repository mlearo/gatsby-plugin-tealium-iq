"use strict";

/** @type {import('gatsby').GatsbyNode["onPreInit"]} */
exports.onPreInit = function (args, options) {
  console.log("Options : ", options)
  if (options.defaultDataLayer) {
    options.defaultDataLayer = {
      type: typeof options.defaultDataLayer,
      value: options.defaultDataLayer
    };

    if (options.defaultDataLayer.type === "function") {
      options.defaultDataLayer.value = options.defaultDataLayer.value.toString();
    }
  }
  
};

exports.pluginOptionsSchema = function (_ref) {
  var Joi = _ref.Joi;
  return Joi.object({
    includeInDevelopment: Joi.boolean().default(false).description("Include Tealium iQ when running in development mode."),
    defaultDataLayer: Joi.alternatives().try(Joi.object(), Joi.function()).default(null).description("Data layer to be set before Tealium iQ is loaded. Should be an object or a function."),
    dataLayerName: Joi.string().description("Data layer name."),
    account :Joi.string().description("Account"),
    profile : Joi.string().description("Profile"),
    noview : Joi.string().description("Disable default page view"),
    routeChangeEventName: Joi.string().default("gatsby-route-change").description("Name of the event that is triggered on every Gatsby route change.")
  });
};

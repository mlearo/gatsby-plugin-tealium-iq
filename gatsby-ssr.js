"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));

var _react = _interopRequireDefault(require("react"));

var _commonTags = require("common-tags");


function _templateObject3() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["", ""]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["\n            ", "\n            ", ""]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject(account, profile) {
  var data = (0, _taggedTemplateLiteralLoose2.default)([`\n (function(a,b,c,d){ a='//tags.tiqcdn.com/utag/${account}/${profile}/prod/utag.js';b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);})('','','',''); \n`]);

  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}

var generateUtag = function generateUtag(_ref) {
  //console.log("stop me here : ", _ref);
  var id = _ref.id,
      environmentParamStr = _ref.environmentParamStr,
      dataLayerName = _ref.dataLayerName,
      account = _ref.account,
      profile = _ref.profile;
  var res = (0, _commonTags.stripIndent)(_templateObject(account, profile));
  return res;
};


var generateUtagCfgOverrides = function generateUtagCfgOverrides(configObject) {
  var result = "window.utag_cfg_ovrd = window.utag_cfg_ovrd || {};";
  let dl = configObject.value
  console.log("Config Object: ", configObject)

  for(var d in configObject){
    result += "window.utag_cfg_ovrd['" + d + "']='" + configObject[d] + "';";
  }
  return (0, _commonTags.stripIndent)(_templateObject3(), result);
  
}

exports.onRenderBody = function (_ref3, _ref4) {
  var setHeadComponents = _ref3.setHeadComponents,
      setPreBodyComponents = _ref3.setPreBodyComponents,
      reporter = _ref3.reporter;
  var id = _ref4.id, 
      _ref4$includeInDevelo = _ref4.includeInDevelopment,
      includeInDevelopment = _ref4$includeInDevelo === void 0 ? false : _ref4$includeInDevelo,
      account = _ref4.account,
      profile = _ref4.profile,
      defaultDataLayer = _ref4.defaultDataLayer,
      _ref4$dataLayerName = _ref4.dataLayerName,
      cfgOverride = {noview : _ref4.noView || false },
      dataLayerName = _ref4$dataLayerName === void 0 ? "dataLayer" : _ref4$dataLayerName;

  if (process.env.NODE_ENV === "production" || includeInDevelopment) {
    //var environmentParamStr = gtmAuth && gtmPreview ? (0, _commonTags.oneLine)(_templateObject4(), gtmAuth, gtmPreview) : "";
    var defaultDataLayerCode = "";
    var defaultConfigObject = "";
/*
    if (defaultDataLayer) {
      defaultDataLayerCode = generateDefaultDataLayer(defaultDataLayer, reporter, dataLayerName);
    }
*/
    if(true) {
      defaultConfigObject = generateUtagCfgOverrides(cfgOverride, reporter)
    }

    setHeadComponents([/*#__PURE__*/_react.default.createElement("script", {
      key: "plugin-tealium-iq",
      dangerouslySetInnerHTML: {
        __html: (0, _commonTags.oneLine)(_templateObject5(), defaultConfigObject)
      }
    })]);

    setPreBodyComponents([/*#__PURE__*/_react.default.createElement("script", {
      key: "plugin-tealium-iq",
      dangerouslySetInnerHTML: {
        __html: (0, _commonTags.oneLine)(_templateObject5(), generateUtag({
          account : account,
          profile : profile
        }))
      }
    })]);
    
  
  }
};

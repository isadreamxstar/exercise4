// API.js
// ======

/* Copyright  2014 Yahoo Inc. 
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */

define([
  'public/modules/gifs/views/src/modules/core/utils',
  'public/modules/gifs/views/src/modules/core/error',
  'public/modules/gifs/views/src/modules/core/defaultOptions',
  'public/modules/gifs/views/src/modules/API/isSupported',
  'public/modules/gifs/views/src/modules/API/isWebCamGIFSupported',
  'public/modules/gifs/views/src/modules/API/isExistingImagesGIFSupported',
  'public/modules/gifs/views/src/modules/API/isExistingVideoGIFSupported',
  'public/modules/gifs/views/src/modules/API/createGIF',
  'public/modules/gifs/views/src/modules/API/takeSnapShot',
  'public/modules/gifs/views/src/modules/API/stopVideoStreaming'
], function(
  utils,
  error,
  defaultOptions,
  isSupported,
  isWebCamGIFSupported,
  isExistingImagesGIFSupported,
  isExistingVideoGIFSupported,
  createGIF,
  takeSnapShot,
  stopVideoStreaming
) {
  var gifshot = {
    'utils': utils,
    'error': error,
    'defaultOptions': defaultOptions,
    'createGIF': createGIF,
    'takeSnapShot': takeSnapShot,
    'stopVideoStreaming': stopVideoStreaming,
    'isSupported': isSupported,
    'isWebCamGIFSupported': isWebCamGIFSupported,
    'isExistingVideoGIFSupported': isExistingVideoGIFSupported,
    'isExistingImagesGIFSupported': isExistingImagesGIFSupported,
    'VERSION': '0.1.1'
  };

  return gifshot;
});
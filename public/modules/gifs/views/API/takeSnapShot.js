// takeSnapShot.js
// ===============

/* Copyright  2014 Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */

define([
  'public/modules/gifs/views/src/modules/core/utils',
  'public/modules/gifs/views/src/modules/core/defaultOptions',
  'public/modules/gifs/views/src/modules/API/createGIF'
], function(utils, defaultOptions, createGIF) {
  return function(userOptions, callback) {
    callback = utils.isFunction(userOptions) ? userOptions : callback;
    userOptions = utils.isObject(userOptions) ? userOptions : {};

    if (!utils.isFunction(callback)) {
      return;
    }

    var mergedOptions = utils.mergeOptions(defaultOptions, userOptions),
      options = utils.mergeOptions(mergedOptions, {
        'interval': .1,
        'numFrames': 1
      });

    createGIF(options, callback);
  };
});
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Gif = mongoose.model('Gif'),
	_ = require('lodash');

/**
 * Create a Gif
 */
exports.create = function(req, res) {
  console.log(req.body);
  console.log(req.files);
  var gif = new Gif(req.body);
  gif.user = req.user;
  if(req.files.image) {
    gif.image =req.files.image.path.substring(7);
    console.log(gif.image);
  }  else
    gif.image='default.jpg';

	gif.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.redirect('/#!/gifs/'+gif._id); // redirection to '/'jsonp(gif);
		}
	});
};

/**
 * Show the current Gif
 */
exports.read = function(req, res) {
	req.gif.views += 1;
	req.gif.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else 
			res.jsonp(req.gif);
		});
};

/**
 * Update a Gif
 */
exports.update = function(req, res) {
	var gif = req.gif ;

	gif = _.extend(gif , req.body);

	gif.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(gif);
		}
	});
};

/**
 * Delete an Gif
 */
exports.delete = function(req, res) {
	var gif = req.gif ;

	gif.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(gif);
		}
	});
};

/**
 * List of Gif
 */
exports.list = function(req, res) { 
	Gif.find().sort('-created').populate('user', 'displayName').exec(function(err, gifs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(gifs);
		}
	});
};

/**
 * Gif middleware
 */
exports.gifByID = function(req, res, next, id) { 
	Gif.findById(id).populate('user', 'displayName').exec(function(err, gif) {
		if (err) return next(err);
		if (! gif) return next(new Error('Failed to load Gif ' + id));
		req.gif = gif ;
		next();
	});
};

/**
 * Gif authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.gif.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

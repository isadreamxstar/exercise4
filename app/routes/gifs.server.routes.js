'use strict';

module.exports = function(app) {
  var users = require('../../app/controllers/users.server.controller');
  var gifs = require('../../app/controllers/gifs.server.controller');
  var multer = require('multer');
  
  app.use(multer({ dest:'./public/uploads'}));
  // Gifs Routes
  app.route('/gifs')
		.get(gifs.list)
		.post(users.requiresLogin, gifs.create);

	app.route('/gifs/:gifId')
		.get(gifs.read)
		.put(users.requiresLogin, gifs.hasAuthorization, gifs.update)
		.delete(users.requiresLogin, gifs.hasAuthorization, gifs.delete);

	// Finish by binding the Gif middleware
	app.param('gifId', gifs.gifByID);
	
};

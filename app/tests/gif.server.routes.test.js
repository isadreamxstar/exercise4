'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Gif = mongoose.model('Gif'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, gif;

/**
 * Gif routes tests
 */
describe('Gif CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Gif
		user.save(function() {
			gif = {
				name: 'Gif Name'
			};

			done();
		});
	});

	it('should be able to save Gif instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Gif
				agent.post('/gifs')
					.send(gif)
					.expect(200)
					.end(function(gifSaveErr, gifSaveRes) {
						// Handle Gif save error
						if (gifSaveErr) done(gifSaveErr);

						// Get a list of Gif
						agent.get('/gifs')
							.end(function(gifsGetErr, gifsGetRes) {
								// Handle Gif save error
								if (gifsGetErr) done(gifsGetErr);

								// Get Gifs list
								var gifs = gifsGetRes.body;

								// Set assertions
								(gifs[0].user._id).should.equal(userId);
								(gifs[0].name).should.match('Gif Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Gif instance if not logged in', function(done) {
		agent.post('/gifs')
			.send(gif)
			.expect(401)
			.end(function(gifSaveErr, gifSaveRes) {
				// Call the assertion callback
				done(gifSaveErr);
			});
	});

	it('should not be able to save Gif instance if no name is provided', function(done) {
		// Invalidate name field
		gif.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Gif
				agent.post('/gifs')
					.send(gif)
					.expect(400)
					.end(function(gifSaveErr, gifSaveRes) {
						// Set message assertion
						(gifSaveRes.body.message).should.match('Please fill Gif name');
						
						// Handle Gif save error
						done(gifSaveErr);
					});
			});
	});

	it('should be able to update Gif instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Gif
				agent.post('/gifs')
					.send(gif)
					.expect(200)
					.end(function(gifSaveErr, gifSaveRes) {
						// Handle Gif save error
						if (gifSaveErr) done(gifSaveErr);

						// Update Gif name
						gif.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Gif
						agent.put('/gifs/' + gifSaveRes.body._id)
							.send(gif)
							.expect(200)
							.end(function(gifUpdateErr, gifUpdateRes) {
								// Handle Gif update error
								if (gifUpdateErr) done(gifUpdateErr);

								// Set assertions
								(gifUpdateRes.body._id).should.equal(gifSaveRes.body._id);
								(gifUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Gifs if not signed in', function(done) {
		// Create new Gif model instance
		var gifObj = new Gif(gif);

		// Save the Gif
		gifObj.save(function() {
			// Request Gifs
			request(app).get('/gifs')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Gif if not signed in', function(done) {
		// Create new Gif model instance
		var gifObj = new Gif(gif);

		// Save the Gif
		gifObj.save(function() {
			request(app).get('/gifs/' + gifObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', gif.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Gif instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new GIf
				agent.post('/gifs')
					.send(gif)
					.expect(200)
					.end(function(gifSaveErr, gifSaveRes) {
						// Handle Gif save error
						if (gifSaveErr) done(gifSaveErr);

						// Delete existing Gif
						agent.delete('/gifs/' + gifSaveRes.body._id)
							.send(gif)
							.expect(200)
							.end(function(gifDeleteErr, gifDeleteRes) {
								// Handle Gif error error
								if (gifDeleteErr) done(gifDeleteErr);

								// Set assertions
								(gifDeleteRes.body._id).should.equal(gifSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Gif instance if not signed in', function(done) {
		// Set Gif user 
		gif.user = user;

		// Create new Gif model instance
		var gifObj = new Gif(gif);

		// Save the Gif
		gifObj.save(function() {
			// Try deleting Gif
			request(app).delete('/gifs/' + gifObj._id)
			.expect(401)
			.end(function(gifDeleteErr, gifDeleteRes) {
				// Set message assertion
				(gifDeleteRes.body.message).should.match('User is not logged in');

				// Handle Gif error error
				done(gifDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Gif.remove().exec();
		done();
	});
});
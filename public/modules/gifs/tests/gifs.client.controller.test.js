'use strict';

(function() {
	// Gifs Controller Spec
	describe('Gifs Controller Tests', function() {
		// Initialize global variables
		var GifsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Gifs controller.
			GifsController = $controller('GifsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Gif object fetched from XHR', inject(function(Gifs) {
			// Create sample Gif using the Gifs service
			var sampleGif = new Gifs({
				name: 'New Gif'
			});

			// Create a sample Gifs array that includes the new Gif
			var sampleGifs = [sampleGif];

			// Set GET response
			$httpBackend.expectGET('gifs').respond(sampleGifs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.gifs).toEqualData(sampleGifs);
		}));

		it('$scope.findOne() should create an array with one Gif object fetched from XHR using a gifId URL parameter', inject(function(Gifs) {
			// Define a sample Gif object
			var sampleGif = new Gifs({
				name: 'New Gif'
			});

			// Set the URL parameter
			$stateParams.gifId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/gifs\/([0-9a-fA-F]{24})$/).respond(sampleGif);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.gif).toEqualData(sampleGif);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Gifs) {
			// Create a sample Gif object
			var sampleGifPostData = new Gif({
				name: 'New Gif'
			});

			// Create a sample Gif response
			var sampleGifResponse = new Gifs({
				_id: '525cf20451979dea2c000001',
				name: 'New Gif'
			});

			// Fixture mock form input values
			scope.name = 'New Gif';

			// Set POST response
			$httpBackend.expectPOST('gifs', sampleGifPostData).respond(sampleGifResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Gif was created
			expect($location.path()).toBe('/gifs/' + sampleGifResponse._id);
		}));

		it('$scope.update() should update a valid Gif', inject(function(Gifs) {
			// Define a sample Gif put data
			var sampleGifPutData = new Gifs({
				_id: '525cf20451979dea2c000001',
				name: 'New Gif'
			});

			// Mock Gif in scope
			scope.gif = sampleGifPutData;

			// Set PUT response
			$httpBackend.expectPUT(/gifs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/gifs/' + sampleGifPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid gifId and remove the gif from the scope', inject(function(Gifs) {
			// Create new Gif object
			var sampleGif = new Gifs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Gifs array and include the Gif
			scope.gifs = [sampleGif];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/gifs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGif);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.gifs.length).toBe(0);
		}));
	});
}());
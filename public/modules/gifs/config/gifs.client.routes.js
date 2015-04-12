'use strict';

//Setting up route
angular.module('gifs').config(['$stateProvider',
	function($stateProvider) {
		// Photos state routing
		$stateProvider.
		state('listGifs', {
			url: '/gifs',
			templateUrl: 'modules/gifs/views/list-gifs.client.view.html'
		}).
		state('createGif', {
			url: '/gifs/create',
			templateUrl: 'modules/gifs/views/create-gif.client.view.html'
		}).
		state('viewPhoto', {
			url: '/photos/:photoId',
			templateUrl: 'modules/gifs/views/view-gif.client.view.html'
		}).
		state('editGif', {
			url: '/gifs/:gifId/edit',
			templateUrl: 'modules/gifs/views/edit-gif.client.view.html'
		});
	}
]);
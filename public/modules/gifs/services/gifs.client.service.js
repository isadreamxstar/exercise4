'use strict';

//Gifs service used to communicate Photos REST endpoints
angular.module('gifs').factory('Gifs', ['$resource',
	function($resource) {
		return $resource('gifs/:gifId', { gifId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

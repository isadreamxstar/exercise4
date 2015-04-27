
'use strict';

//Photos service used to communicate Photos REST endpoints

angular.module('filters').factory('Filter', ['$resource',
	function($resource) {
		return $resource('photos/:photoId', { 
			photoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},
			invertImage: {
				method: 'get'
			}
		});
	}
]);


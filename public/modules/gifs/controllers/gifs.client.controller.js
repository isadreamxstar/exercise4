'use strict';


angular.module('gifs').controller('GifsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Gifs', 
	function($scope, $stateParams, $location, Authentication, Gifs) {
	  $scope.authentication = Authentication;

		// Create new Gif
		$scope.create = function() {
			// Create new Gif object
			var gif = new Gifs ({
			  name: this.name
			});
		  gif.$save(function(response) {
		    $location.path('gifs/' + response._id);

		    // Clear form fields
					$scope.name = '';

                    $scope.image = '';
		  }, function(errorResponse) {
		       $scope.error = errorResponse.data.message;
		     });
                  
		};

		// Remove existing Gif
		$scope.remove = function(gif) {
			if ( gif ) { 
				gif.$remove();

				for (var i in $scope.gifs) {
					if ($scope.gifs [i] === gif) {
						$scope.gifs.splice(i, 1);
					}
				}
			} else {
				$scope.gif.$remove(function() {
					$location.path('gifs');
				});
			}
		};

		// Update existing Gif
		$scope.update = function() {
			var gif = $scope.gif;

			gif.$update(function() {
				$location.path('gifs/' + gif._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Gif
		$scope.find = function() {
			$scope.gifs = Gifs.query();
		};

		// Find existing Gif
		$scope.findOne = function() {
			$scope.gif = Gifs.get({ 
				gifId: $stateParams.gifId
			});
		};
		//Like a gif
		$scope.likeThis = function() {
			$scope.gif.likes +=1;
			var gif = $scope.gif;
			
			console.log('like function called');
			//saves the gif -- note the authorization problem in this version
			gif.$update(function() {
				$location.path('gifs/' + gif._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
}]);
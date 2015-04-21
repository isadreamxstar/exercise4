'use strict';

// Configuring the Articles module
angular.module('gifs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Gifs', 'gifs', 'dropdown', '/gifs(/create)?');
		Menus.addSubMenuItem('topbar', 'gifs', 'List Gifs', 'gifs');
		Menus.addSubMenuItem('topbar', 'gifs', 'New Gif', 'gifs/create');
	}
]);

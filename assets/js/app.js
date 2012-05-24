/* Author: Jonathan Stanton

*/

/**
 * myApp description
 * @return obj returns application
 */
var myApp = function() {
	
	return {

		init : function() {

			myApp.debug = true;
			this.bind_events();

		},

		bind_events : function(){

		}


	};
		
}();

$(function () { myApp.init(); }); //scripts loaded ready to rock and roll
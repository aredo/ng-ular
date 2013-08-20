'use strict';

/* Directives */


angular.module('inVoiceApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).directive('jqAnimate', function(){ 
	  return function(scope, instanceElement){ 
	      setTimeout(function() {instanceElement.show('slow');}, 0); 
	  } 
	});

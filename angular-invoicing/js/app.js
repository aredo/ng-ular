'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('inVoiceApp', ['inVoiceApp.filters', 'inVoiceApp.services', 'inVoiceApp.directives', 'inVoiceApp.controllers']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/index.html', controller: 'InvoiceController'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);

$(document).ready(function(){
  $("#invoice_number").focus();
  $("#imgInp").change(function(){
    readURL(this);
  });
});
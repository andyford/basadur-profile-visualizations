'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/raw', {templateUrl: 'partials/raw.html', controller: 'rawDataCtrl'});
  $routeProvider.when('/using-knowledge', {templateUrl: 'partials/knowledge-use.html', controller: 'knowledgeUsageCtrl'});
  $routeProvider.when('/gaining-knowledge', {templateUrl: 'partials/knowledge-gain.html', controller: 'knowledgeGainCtrl'});
  $routeProvider.when('/1st-fave', {templateUrl: 'partials/team-primary.html', controller: 'teamCtrl'});
  $routeProvider.when('/1st-2nd-fave', {templateUrl: 'partials/team-primary-secondary.html', controller: 'teamCtrl'});
  $routeProvider.when('/least-fave', {templateUrl: 'partials/team-quaternary.html', controller: 'teamCtrl'});
  $routeProvider.when('/all-charts', {templateUrl: 'partials/all-charts.html', controller: 'allChartsCtrl'});
  $routeProvider.otherwise({redirectTo: '/raw'});
}]);

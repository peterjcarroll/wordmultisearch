angular.module('pjcWordMultiSearch.about', [
   'ngRoute',
   'ui.bootstrap',
])

.config(function ($routeProvider) {
   $routeProvider
   .when('/about', {
      controller: 'AboutPageController',
      templateUrl: 'app/about/about.html'
   });
})

.controller('AboutPageController', function ($scope) {
})
;
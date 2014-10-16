angular.module('pjcWordMultiSearch.about', [
   'ngRoute',
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
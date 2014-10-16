var app = angular.module('pjcWordMultiSearch', [
   'ngRoute',
   'pjcWordMultiSearch.search',
   'pjcWordMultiSearch.about'
]);

app.config(function ($routeProvider) {
   $routeProvider.otherwise({ redirectTo: '/search' });
});

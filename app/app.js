var app = angular.module('pjcWordMultiSearch', [
   'ngRoute',
   'ui.bootstrap',
   'pjcWordMultiSearch.search',
   'pjcWordMultiSearch.about'
]);

app.config(function ($routeProvider) {
   $routeProvider.otherwise({ redirectTo: '/search' });
});

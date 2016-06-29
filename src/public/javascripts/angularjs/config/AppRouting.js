/**
 * Created by irfan.maulana on 6/28/2016.
 */
'use strict';
var mainConfig = angular.module('main-module.config', ['ngRoute']);

mainConfig.run(['$route', function($route)  {
    $route.reload();
}]);

mainConfig.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/film', {
                templateUrl: '/pages/film.html',
                controller: 'film.ctrl',
                controllerAs: 'film.ctrl'
            }).
            when('/people', {
                templateUrl: '/pages/people.html',
                controller: 'people.ctrl',
                controllerAs: 'people.ctrl'
            }).
            when('/planet', {
                templateUrl: '/pages/planet.html',
                controller: 'planet.ctrl',
                controllerAs: 'planet.ctrl'
            }).
            when('/spaceship', {
                templateUrl: '/pages/spaceship.html',
                controller: 'spaceship.ctrl',
                controllerAs: 'spaceship.ctrl'
            }).
            when('/species', {
                templateUrl: '/pages/species.html',
                controller: 'species.ctrl',
                controllerAs: 'species.ctrl'
            }).
            when('/vehicle', {
                templateUrl: '/pages/vehicle.html',
                controller: 'vehicle.ctrl',
                controllerAs: 'vehicle.ctrl'
            }).
            otherwise({
                redirectTo: 'film'
            });

        // use the HTML5 History API
        // $locationProvider.html5Mode(true);
    }]);
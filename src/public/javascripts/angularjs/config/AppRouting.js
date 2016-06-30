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
            when('/film/:id', {
                templateUrl: '/pages/film-detail.html',
                controller: 'film-detail.ctrl',
                controllerAs: 'film-detail.ctrl'
            }).
            when('/people', {
                templateUrl: '/pages/people.html',
                controller: 'people.ctrl',
                controllerAs: 'people.ctrl'
            }).
            when('/people/:id', {
                templateUrl: '/pages/people-detail.html',
                controller: 'people-detail.ctrl',
                controllerAs: 'people-detail.ctrl'
            }).
            when('/planet', {
                templateUrl: '/pages/planet.html',
                controller: 'planet.ctrl',
                controllerAs: 'planet.ctrl'
            }).
            when('/planet/:id', {
                templateUrl: '/pages/planet-detail.html',
                controller: 'planet-detail.ctrl',
                controllerAs: 'planet-detail.ctrl'
            }).
            when('/spaceship', {
                templateUrl: '/pages/spaceship.html',
                controller: 'spaceship.ctrl',
                controllerAs: 'spaceship.ctrl'
            }).
            when('/spaceship/:id', {
                templateUrl: '/pages/spaceship-detail.html',
                controller: 'spaceship-detail.ctrl',
                controllerAs: 'spaceship-detail.ctrl'
            }).
            when('/species', {
                templateUrl: '/pages/species.html',
                controller: 'species.ctrl',
                controllerAs: 'species.ctrl'
            }).
            when('/film/:id', {
                templateUrl: '/pages/species-detail.html',
                controller: 'species-detail.ctrl',
                controllerAs: 'species-detail.ctrl'
            }).
            when('/vehicle', {
                templateUrl: '/pages/vehicle.html',
                controller: 'vehicle.ctrl',
                controllerAs: 'vehicle.ctrl'
            }).
            when('/vehicle/:id', {
                templateUrl: '/pages/vehicle-detail.html',
                controller: 'vehicle-detail.ctrl',
                controllerAs: 'vehicle-detail.ctrl'
            }).
            otherwise({
                redirectTo: 'film'
            });

        // use the HTML5 History API
        // $locationProvider.html5Mode(true);
    }]);
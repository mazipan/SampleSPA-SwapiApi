/**
 * Created by irfan.maulana on 6/28/2016.
 */
'use strict';
var mainService = angular.module('main-module.service', ['ngResource']);
mainService
    .factory('mainService', ['$resource', mainServiceFunc])
    .factory('filmService', ['$resource', filmServiceFunc])
    .factory('filmDetailService', ['$resource', filmDetailServiceFunc])
    .factory('peopleService', ['$resource', peopleServiceFunc])
    .factory('peopleDetailService', ['$resource', peopleDetailServiceFunc])
    .factory('planetService', ['$resource', planetServiceFunc])
    .factory('planetDetailService', ['$resource', planetDetailServiceFunc])
    .factory('spaceshipService', ['$resource', spaceshipServiceFunc])
    .factory('spaceshipDetailService', ['$resource', spaceshipDetailServiceFunc])
    .factory('speciesService', ['$resource', speciesServiceFunc])
    .factory('speciesDetailService', ['$resource', speciesDetailServiceFunc])
    .factory('vehicleService', ['$resource', vehicleServiceFunc])
    .factory('vehicleDetailService', ['$resource', vehicleDetailServiceFunc]);

function mainServiceFunc($resource) {
    return $resource('http://swapi.co/api/:command/:command2', {}, {

    });
}

function filmServiceFunc($resource) {
    return $resource('http://swapi.co/api/films/.:root', {}, {
        'getFilms': {
            method: 'GET',
            params: {
                page: '@page',
                root: '@root'
            }
        }
    });
}

function filmDetailServiceFunc($resource) {
    return $resource('http://swapi.co/api/films/:id/.:root', {}, {
        'getFilmById': {
            method: 'GET',
            params: {
                id: '@id'
            }
        }
    });
}

function peopleServiceFunc($resource) {
    return $resource('http://swapi.co/api/people/.:root', {}, {
        'getPeople': {
            method: 'GET',
            params: {
                page: '@page',
                root: '@root'
            }
        }
    });
}

function peopleDetailServiceFunc($resource) {
    return $resource('http://swapi.co/api/people/:id/.:root', {}, {
        'getPersonById': {
            method: 'GET',
            params: {
                id: '@id'
            }
        }
    });
}

function spaceshipServiceFunc($resource) {
    return $resource('http://swapi.co/api/starships/.:root', {}, {
        'getSpaceships': {
            method: 'GET',
            params: {
                page: '@page',
                root: '@root'
            }
        }
    });
}

function spaceshipDetailServiceFunc($resource) {
    return $resource('http://swapi.co/api/starships/:id/.:root', {}, {
        'getSpaceshipById': {
            method: 'GET',
            params: {
                id: '@id'
            }
        }
    });
}

function speciesServiceFunc($resource) {
    return $resource('http://swapi.co/api/species/.:root', {}, {
        'getSpecies': {
            method: 'GET',
            params: {
                page: '@page',
                root: '@root'
            }
        }
    });
}

function speciesDetailServiceFunc($resource) {
    return $resource('http://swapi.co/api/species/:id/.:root', {}, {
        'getSpeciesById': {
            method: 'GET',
            params: {
                id: '@id'
            }
        }
    });
}

function vehicleServiceFunc($resource) {
    return $resource('http://swapi.co/api/vehicles/.:root', {}, {
        'getVehicles': {
            method: 'GET',
            params: {
                page: '@page',
                root: '@root'
            }
        }
    });
}

function vehicleDetailServiceFunc($resource) {
    return $resource('http://swapi.co/api/vehicles/:id/.:root', {}, {
        'getVehicleById': {
            method: 'GET',
            params: {
                id: '@id'
            }
        }
    });
}

function planetServiceFunc($resource) {
    return $resource('http://swapi.co/api/planets/.:root', {}, {
        'getPlanets': {
            method: 'GET',
            params: {
                page: '@page',
                root: '@root'
            }
        }
    });
}

function planetDetailServiceFunc($resource) {
    return $resource('http://swapi.co/api/planets/:id/.:root', {}, {
        'getPlanetById': {
            method: 'GET',
            params: {
                id: '@id'
            }
        }
    });
}
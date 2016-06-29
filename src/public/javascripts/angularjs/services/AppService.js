/**
 * Created by irfan.maulana on 6/28/2016.
 */
'use strict';
var mainService = angular.module('main-module.service', ['ngResource']);
mainService.factory('mainService', ['$resource', mainServiceFunc]);

function mainServiceFunc($resource) {
    return $resource('http://swapi.co/api/:command/:command2', {}, {
        'getPlanets': {
            method: 'GET',
            params: {
                command: 'planets'
            },
            isArray: true
        },
        'getSpaceships': {
            method: 'GET',
            params: {
                command: 'spaceships'
            },
            isArray: true
        },
        'getVehicles': {
            method: 'GET',
            params: {
                command: 'vehicles'
            },
            isArray: true
        },
        'getPeople': {
            method: 'GET',
            params: {
                command: 'people'
            },
            isArray: true
        },
        'getFilms': {
            method: 'GET',
            params: {
                command: 'films'
            },
            isArray: true
        },
        'getSpecies': {
            method: 'GET',
            params: {
                command: 'species'
            },
            isArray: true
        }
    });
}
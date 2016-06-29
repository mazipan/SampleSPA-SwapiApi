/**
 * Created by irfan.maulana on 6/28/2016.
 */
'use strict';
var application = angular.module('AngularApplication', [
    'main-module.config',
    'main-module.service',
    'storage-module.service',
    'object-share-module.service',
    'main-module.controller',
    'film-module.controller',
    'people-module.controller',
    'planet-module.controller',
    'spaceship-module.controller',
    'species-module.controller',
    'vehicle-module.controller'
]);

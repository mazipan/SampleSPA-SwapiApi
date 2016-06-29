/**
 * Created by irfan.maulana on 6/28/2016.
 */
'use strict';
var spaceshipModule = angular.module('spaceship-module.controller', []);
spaceshipModule.controller('spaceship.ctrl',
        ['$scope', '$q', 'mainService', 'objectShareService', spaceshipCtrl
    ]);

function spaceshipCtrl($scope, $q, mainService, objectShareService){
    $scope.message = 'Everyone come and see how good I look!';
    objectShareService.setTabActive("spaceship");
    objectShareService.getTabActive();
}
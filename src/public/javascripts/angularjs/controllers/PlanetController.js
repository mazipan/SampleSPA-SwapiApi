/**
 * Created by irfan.maulana on 6/28/2016.
 */
'use strict';
var planetModule = angular.module('planet-module.controller', []);
planetModule.controller('planet.ctrl',
        ['$scope', '$q', 'mainService', 'objectShareService', planetCtrl
    ]);

function planetCtrl($scope, $q, mainService, objectShareService){
    $scope.message = 'Everyone come and see how good I look!';
    objectShareService.setTabActive("planet");
    objectShareService.getTabActive();
}
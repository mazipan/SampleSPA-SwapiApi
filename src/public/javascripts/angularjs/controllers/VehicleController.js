/**
 * Created by irfan.maulana on 6/28/2016.
 */
'use strict';
var vehicleModule = angular.module('vehicle-module.controller', []);
vehicleModule.controller('vehicle.ctrl',
        ['$scope', '$q', 'mainService', 'objectShareService', vehicleCtrl
    ]);

function vehicleCtrl($scope, $q, mainService, objectShareService){
    $scope.message = 'Everyone come and see how good I look!';
    objectShareService.setTabActive("vehicle");
    objectShareService.getTabActive();
}
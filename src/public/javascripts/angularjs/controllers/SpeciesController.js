/**
 * Created by irfan.maulana on 6/28/2016.
 */
'use strict';
var speciesModule = angular.module('species-module.controller', []);
speciesModule.controller('species.ctrl',
        ['$scope', '$q', 'mainService', 'objectShareService', speciesCtrl
    ]);

function speciesCtrl($scope, $q, mainService, objectShareService){
    $scope.message = 'Everyone come and see how good I look!';
    objectShareService.setTabActive("species");
    objectShareService.getTabActive();
}
/**
 * Created by irfan.maulana on 6/28/2016.
 */
'use strict';
var mainModule = angular.module('main-module.controller', []);
mainModule.controller('main.ctrl',
        ['$scope', '$q', 'mainService', 'objectShareService', mainCtrl
    ]);

function mainCtrl($scope, $q, mainService, objectShareService){
    $scope.message = 'Everyone come and see how good I look!';

    $scope.$watch(function () {
        return objectShareService.getTabActive();
    }, function () {
        $scope.tabActive = objectShareService.getTabActive();
    });
}
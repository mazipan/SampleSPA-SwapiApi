/**
 * Created by irfan.maulana on 6/28/2016.
 */
'use strict';
var peopleModule = angular.module('people-module.controller', []);
peopleModule.controller('people.ctrl',
        ['$scope', '$q', 'mainService', 'objectShareService', peopleCtrl
    ]);

function peopleCtrl($scope, $q, mainService, objectShareService){
    $scope.message = 'Everyone come and see how good I look!';
    objectShareService.setTabActive("people");
    objectShareService.getTabActive();
}
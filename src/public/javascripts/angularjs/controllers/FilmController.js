/**
 * Created by irfan.maulana on 6/28/2016.
 */
'use strict';
var filmModule = angular.module('film-module.controller', []);
filmModule.controller('film.ctrl',
        ['$scope', '$q', 'mainService', 'objectShareService', filmCtrl
    ]);

function filmCtrl($scope, $q, mainService, objectShareService){
    $scope.message = 'Everyone come and see how good I look!';
    objectShareService.setTabActive("film");
    objectShareService.getTabActive();
}
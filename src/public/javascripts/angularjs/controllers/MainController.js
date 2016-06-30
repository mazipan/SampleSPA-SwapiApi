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
    $scope.isLoading = false;

    $scope.$watch(function () {
        return objectShareService.getTabActive();
    }, function () {
        $scope.tabActive = objectShareService.getTabActive();
    });

    $scope.$watch(function () {
        return objectShareService.getLoader();
    }, function () {
        $scope.isLoading = objectShareService.getLoader();
    });

    var lastPoin = 0;
    $(window).scroll(function () {
        var NEW_POINT = $(window).scrollTop();

        var HEADER_HEIGHT = 100;
        var FOOTER_HEIGHT = 900;
        var DOC_WITHOUT_FOOTER_HEIGHT = $(document).height() - FOOTER_HEIGHT;

        if(lastPoin < NEW_POINT){
            if ($(document).height() > FOOTER_HEIGHT) {
                if (NEW_POINT > DOC_WITHOUT_FOOTER_HEIGHT) {
                    var tab = objectShareService.getTabActive();
                    if(tab === "film"){
                        var childScope=angular.element('#film').scope();
                        childScope.nextFilmPage();
                    }else if(tab === "people"){
                        var childScope=angular.element('#people').scope();
                        childScope.nextPeoplePage();
                    }else if(tab === "planet"){
                        var childScope=angular.element('#planet').scope();
                        childScope.nextPlanetPage();
                    }else if(tab === "spaceship"){
                        var childScope=angular.element('#spaceship').scope();
                        childScope.nextSpaceshipPage();
                    }else if(tab === "species"){
                        var childScope=angular.element('#species').scope();
                        childScope.nextSpeciesPage();
                    }else if(tab === "vehicle"){
                        var childScope=angular.element('#vehicle').scope();
                        childScope.nextVehiclePage();
                    }
                }
            }
        }else{
            if (NEW_POINT < HEADER_HEIGHT) {

            }
        }

        lastPoin = NEW_POINT;
    });
}
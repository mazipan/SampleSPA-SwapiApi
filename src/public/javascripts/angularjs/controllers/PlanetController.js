/**
 * Created by irfan.maulana on 6/28/2016.
 */
'use strict';
var planetModule = angular.module('planet-module.controller', []);
planetModule.controller('planet.ctrl',
        ['$scope', '$q', 'planetService', 'objectShareService', 'storageService', planetCtrl
    ]);

function planetCtrl($scope, $q, planetService, objectShareService, storageService){

    objectShareService.setTabActive("planet");
    $scope.tabActive = objectShareService.getTabActive();

    $scope.planets = {
        "count": 0,
        "next": null,
        "previous": null,
        "result": []
    };
    $scope.allPlanets = {};
    $scope.currentPage = 1;
    $scope.pageArray = [1];
    var keyStorage = storageService.md5hash("planets");
    var keyEncryption = storageService.md5hash("planets-starwars");
    $scope.stillProcess = false;

    $scope.getNumber = function(num) {
        var res = [];
        for (var i = 0; i < num; i++) {
            res.push(i+1);
        }
        return res;
    };

    $scope.checkStorage = function checkStorage(){

        var planetsTemp = storageService.readFromLocalStorage(keyStorage);
        if(planetsTemp){
            var str = storageService.decryptData(planetsTemp, keyEncryption);
            try {
                var temp = JSON.parse(str);
                $scope.allPlanets = temp;
            }catch (err){};
        }

    };

    $scope.nextPlanetPage = function nextPage(){
        if($scope.planets && $scope.planets.next !== null){
            var page = $scope.planets.next.split("?page=");
            if(page.length === 2){
                page = page[1];
                $scope.getDatas(page);
                var offset = $("#planet-page-"+page).offset();
                if(offset){
                    $('html, body').animate({
                        scrollTop: offset.top
                    }, 200);
                }
            }
        }
    };

    $scope.previousPlanetPage = function previousPage(){
        if($scope.planets && $scope.planets.previous !== null){
            var page = $scope.planets.previous.split("?page=");
            if(page.length === 2){
                page = page[1];
                $scope.getDatas(page);
            }
        }
    };

    $scope.getDatas = function getDatas(page){
        $scope.checkStorage();
        if(!$scope.allPlanets[page]){
            objectShareService.setLoader(true);
            objectShareService.getLoader();

            if(!$scope.stillProcess){
                $scope.stillProcess = true;
                $scope.currentPage = page;
                $scope.pageArray = $scope.getNumber(page);
                planetService.getPlanets({
                    page: page
                })
                .$promise
                .then(function (response) {
                    $scope.stillProcess = false;
                    objectShareService.setLoader(false);
                    objectShareService.getLoader();

                    if(response){
                        $scope.allPlanets[page] = response;
                        $scope.planets = $scope.allPlanets[page];
                        var encrypted =
                            storageService.encryptData(
                                JSON.stringify($scope.allPlanets), keyEncryption
                            ).toString();
                        storageService.saveIntoLocalStorage(keyStorage, encrypted);
                    }
                });
            }

        }else{
            $scope.planets = $scope.allPlanets[page];
            $scope.currentPage = page;
            $scope.pageArray = $scope.getNumber(page);
        }

    };

    // init with page 1
    $scope.getDatas(1);

}
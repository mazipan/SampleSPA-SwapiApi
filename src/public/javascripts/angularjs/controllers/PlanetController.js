/**
 * Created by irfan.maulana on 6/28/2016.
 */
'use strict';
var planetModule = angular.module('planet-module.controller', []);
planetModule.controller('planet.ctrl',
        ['$scope', '$q', 'planetService', 'objectShareService', 'storageService', planetCtrl
    ]);
planetModule.controller('planet-detail.ctrl',
    ['$scope', '$routeParams', 'planetDetailService', 'objectShareService', 'storageService', planetDetailCtrl
    ]);

function planetDetailCtrl($scope, $routeParams, planetDetailService, objectShareService, storageService){
    $scope.id = $routeParams.id;
    planetDetailService.getPlanetById({
        id: $scope.id
    })
    .$promise
    .then(function (response) {
        objectShareService.setLoader(false);
        objectShareService.getLoader();
        $scope.planet = response;
    });
}

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
                planetService.getPlanets({
                    page: page
                })
                .$promise
                .then(function (response) {
                    $scope.stillProcess = false;
                    objectShareService.setLoader(false);
                    objectShareService.getLoader();

                    if(response){
                        $scope.currentPage = page;
                        $scope.pageArray = $scope.getNumber(page);
                        $scope.allPlanets[page] = response;
                        $scope.planets = $scope.allPlanets[page];
                        $scope.setIdOfPlanet($scope.allPlanets);
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
            $scope.setIdOfPlanet($scope.allPlanets);
        }

    };

    $scope.setIdOfPlanet = function setIdOfPlanet(allPlanets){
        for(var i=0; i<$scope.pageArray.length; i++){
            var index = $scope.pageArray[i];
            var planets = allPlanets[index];
            if(planets && planets.results){
                for(var j=0; j<planets.results.length; j++){
                    var planet = planets.results[j];
                    if(planet.url){
                        var splits = planet.url.split("/");
                        var id = splits[splits.length-2];
                        planet.id = id;
                    }
                }
            }
        }
    };

    // init with page 1
    $scope.getDatas(1);

}
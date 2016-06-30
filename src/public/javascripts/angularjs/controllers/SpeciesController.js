/**
 * Created by irfan.maulana on 6/28/2016.
 */
'use strict';
var speciesModule = angular.module('species-module.controller', []);
speciesModule.controller('species.ctrl',
        ['$scope', '$q', 'speciesService', 'objectShareService', 'storageService', speciesCtrl
    ]);

function speciesCtrl($scope, $q, speciesService, objectShareService, storageService){

    objectShareService.setTabActive("species");
    $scope.tabActive = objectShareService.getTabActive();

    $scope.species = {
        "count": 0,
        "next": null,
        "previous": null,
        "result": []
    };
    $scope.allSpecies = {};
    $scope.currentPage = 1;
    $scope.pageArray = [1];
    var keyStorage = storageService.md5hash("species");
    var keyEncryption = storageService.md5hash("species-starwars");
    $scope.stillProcess = false;


    $scope.getNumber = function(num) {
        var res = [];
        for (var i = 0; i < num; i++) {
            res.push(i+1);
        }
        return res;
    };

    $scope.checkStorage = function checkStorage(){

        var speciesTemp = storageService.readFromLocalStorage(keyStorage);
        if(speciesTemp){
            var str = storageService.decryptData(speciesTemp, keyEncryption);
            try {
                var temp = JSON.parse(str);
                $scope.allSpecies = temp;
            }catch (err){};
        }

    };

    $scope.nextSpeciesPage = function nextPage(){
        if($scope.species && $scope.species.next !== null){
            var page = $scope.species.next.split("?page=");
            if(page.length === 2){
                page = page[1];
                $scope.getDatas(page);
                var offset = $("#species-page-"+page).offset();
                if(offset){
                    $('html, body').animate({
                        scrollTop: offset.top
                    }, 200);
                }
            }
        }
    };

    $scope.previousSpeciesPage = function previousPage(){
        if($scope.species && $scope.species.previous !== null){
            var page = $scope.species.previous.split("?page=");
            if(page.length === 2){
                page = page[1];
                $scope.getDatas(page);
            }
        }
    };

    $scope.getDatas = function getDatas(page){
        $scope.checkStorage();
        if(!$scope.allSpecies[page]){
            objectShareService.setLoader(true);
            objectShareService.getLoader();

            if(!$scope.stillProcess){
                $scope.stillProcess = true;
                $scope.currentPage = page;
                $scope.pageArray = $scope.getNumber(page);
                speciesService.getSpecies({
                    page: page
                })
                    .$promise
                    .then(function (response) {
                        $scope.stillProcess = false;
                        objectShareService.setLoader(false);
                        objectShareService.getLoader();

                        if(response){
                            $scope.allSpecies[page] = response;
                            $scope.species = $scope.allSpecies[page];
                            var encrypted =
                                storageService.encryptData(
                                    JSON.stringify($scope.allSpecies), keyEncryption
                                ).toString();
                            storageService.saveIntoLocalStorage(keyStorage, encrypted);
                        }
                    });
            }

        }else{
            $scope.species = $scope.allSpecies[page];
            $scope.currentPage = page;
            $scope.pageArray = $scope.getNumber(page);
        }

    };

    // init with page 1
    $scope.getDatas(1);

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
                    if(tab === "species"){
                        $scope.nextSpeciesPage();
                    }
                }
            }
        }else{
            if (NEW_POINT < HEADER_HEIGHT) {
                //$scope.previousPlanetPage();
            }
        }

        lastPoin = NEW_POINT;
    });
}
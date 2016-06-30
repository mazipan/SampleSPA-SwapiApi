/**
 * Created by irfan.maulana on 6/28/2016.
 */
'use strict';
var spaceshipModule = angular.module('spaceship-module.controller', []);
spaceshipModule.controller('spaceship.ctrl',
        ['$scope', '$q', 'spaceshipService', 'objectShareService', 'storageService', spaceshipCtrl
    ]);

function spaceshipCtrl($scope, $q, spaceshipService, objectShareService, storageService){
    objectShareService.setTabActive("spaceship");
    $scope.tabActive = objectShareService.getTabActive();

    $scope.spaceship = {
        "count": 0,
        "next": null,
        "previous": null,
        "result": []
    };
    $scope.allSpaceships = {};
    $scope.currentPage = 1;
    $scope.pageArray = [1];
    var keyStorage = storageService.md5hash("spaceship");
    var keyEncryption = storageService.md5hash("spaceship-starwars");
    $scope.stillProcess = false;


    $scope.getNumber = function(num) {
        var res = [];
        for (var i = 0; i < num; i++) {
            res.push(i+1);
        }
        return res;
    };

    $scope.checkStorage = function checkStorage(){

        var spaceshipTemp = storageService.readFromLocalStorage(keyStorage);
        if(spaceshipTemp){
            var str = storageService.decryptData(spaceshipTemp, keyEncryption);
            try {
                var temp = JSON.parse(str);
                $scope.allSpaceships = temp;
            }catch (err){};
        }

    };

    $scope.nextSpaceshipPage = function nextPage(){
        if($scope.spaceship && $scope.spaceship.next !== null){
            var page = $scope.spaceship.next.split("?page=");
            if(page.length === 2){
                page = page[1];
                $scope.getDatas(page);
                var offset = $("#spaceship-page-"+page).offset();
                if(offset){
                    $('html, body').animate({
                        scrollTop: offset.top
                    }, 200);
                }
            }
        }
    };

    $scope.previousSpaceshipPage = function previousPage(){
        if($scope.spaceship && $scope.spaceship.previous !== null){
            var page = $scope.spaceship.previous.split("?page=");
            if(page.length === 2){
                page = page[1];
                $scope.getDatas(page);
            }
        }
    };

    $scope.getDatas = function getDatas(page){
        $scope.checkStorage();
        if(!$scope.allSpaceships[page]){
            objectShareService.setLoader(true);
            objectShareService.getLoader();

            if(!$scope.stillProcess){
                $scope.stillProcess = true;
                $scope.currentPage = page;
                $scope.pageArray = $scope.getNumber(page);
                spaceshipService.getSpaceships({
                    page: page
                })
                    .$promise
                    .then(function (response) {
                        $scope.stillProcess = false;
                        objectShareService.setLoader(false);
                        objectShareService.getLoader();

                        if(response){
                            $scope.allSpaceships[page] = response;
                            $scope.spaceship = $scope.allSpaceships[page];
                            var encrypted =
                                storageService.encryptData(
                                    JSON.stringify($scope.allSpaceships), keyEncryption
                                ).toString();
                            storageService.saveIntoLocalStorage(keyStorage, encrypted);
                        }
                    });
            }

        }else{
            $scope.spaceship = $scope.allSpaceships[page];
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
                        $scope.nextSpaceshipPage();
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
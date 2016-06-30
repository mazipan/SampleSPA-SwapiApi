/**
 * Created by irfan.maulana on 6/28/2016.
 */
'use strict';
var spaceshipModule = angular.module('spaceship-module.controller', []);
spaceshipModule.controller('spaceship.ctrl',
        ['$scope', '$q', 'spaceshipService', 'objectShareService', 'storageService', spaceshipCtrl
    ]);
spaceshipModule.controller('spaceship-detail.ctrl',
    ['$scope', '$routeParams', 'spaceshipDetailService', 'objectShareService', 'storageService', spaceshipDetailCtrl
    ]);

function spaceshipDetailCtrl($scope, $routeParams, spaceshipDetailService, objectShareService, storageService){
    $scope.id = $routeParams.id;
    spaceshipDetailService.getSpaceshipById({
        id: $scope.id
    })
    .$promise
    .then(function (response) {
        objectShareService.setLoader(false);
        objectShareService.getLoader();
        $scope.spaceship = response;
    });
}

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
                spaceshipService.getSpaceships({
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
                            $scope.allSpaceships[page] = response;
                            $scope.spaceship = $scope.allSpaceships[page];
                            $scope.setIdOfSpaceship($scope.allSpaceships);
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
            $scope.setIdOfSpaceship($scope.allSpaceships); 
        }

    };

    $scope.setIdOfSpaceship = function setIdOfSpaceship(allSpaceships){
        for(var i=0; i<$scope.pageArray.length; i++){
            var index = $scope.pageArray[i];
            var spaceships = allSpaceships[index];
            if(spaceships && spaceships.results){
                for(var j=0; j<spaceships.results.length; j++){
                    var spaceship = spaceships.results[j];
                    if(spaceship.url){
                        var splits = spaceship.url.split("/");
                        var id = splits[splits.length-2];
                        spaceship.id = id;
                    }
                }
            }
        }
    };

    // init with page 1
    $scope.getDatas(1);

}
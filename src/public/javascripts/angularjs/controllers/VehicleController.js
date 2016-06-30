/**
 * Created by irfan.maulana on 6/28/2016.
 */
'use strict';
var vehicleModule = angular.module('vehicle-module.controller', []);
vehicleModule.controller('vehicle.ctrl',
        ['$scope', '$q', 'vehicleService', 'objectShareService', 'storageService', vehicleCtrl
    ]);
vehicleModule.controller('vehicle-detail.ctrl',
    ['$scope', '$routeParams', 'vehicleDetailService', 'objectShareService', 'storageService', vehicleDetailCtrl
    ]);

function vehicleDetailCtrl($scope, $routeParams, vehicleDetailService, objectShareService, storageService){
    $scope.id = $routeParams.id;
    vehicleDetailService.getVehicleById({
        id: $scope.id
    })
    .$promise
    .then(function (response) {
        objectShareService.setLoader(false);
        objectShareService.getLoader();
        $scope.vehicle = response;
    });
}

function vehicleCtrl($scope, $q, vehicleService, objectShareService, storageService){

    objectShareService.setTabActive("vehicle");
    $scope.tabActive = objectShareService.getTabActive();

    $scope.vehicles = {
        "count": 0,
        "next": null,
        "previous": null,
        "result": []
    };
    $scope.allVehicles = {};
    $scope.currentPage = 1;
    $scope.pageArray = [1];
    var keyStorage = storageService.md5hash("vehicles");
    var keyEncryption = storageService.md5hash("vehicles-starwars");
    $scope.stillProcess = false;


    $scope.getNumber = function(num) {
        var res = [];
        for (var i = 0; i < num; i++) {
            res.push(i+1);
        }
        return res;
    };

    $scope.checkStorage = function checkStorage(){

        var vehiclesTemp = storageService.readFromLocalStorage(keyStorage);
        if(vehiclesTemp){
            var str = storageService.decryptData(vehiclesTemp, keyEncryption);
            try {
                var temp = JSON.parse(str);
                $scope.allVehicles = temp;
            }catch (err){};
        }

    };

    $scope.nextVehiclePage = function nextPage(){
        if($scope.vehicles && $scope.vehicles.next !== null){
            var page = $scope.vehicles.next.split("?page=");
            if(page.length === 2){
                page = page[1];
                $scope.getDatas(page);
                var offset = $("#vehicle-page-"+page).offset();
                if(offset){
                    $('html, body').animate({
                        scrollTop: offset.top
                    }, 200);
                }
            }
        }
    };

    $scope.previousVehiclePage = function previousPage(){
        if($scope.vehicles && $scope.vehicles.previous !== null){
            var page = $scope.vehicles.previous.split("?page=");
            if(page.length === 2){
                page = page[1];
                $scope.getDatas(page);
            }
        }
    };

    $scope.getDatas = function getDatas(page){
        $scope.checkStorage();
        if(!$scope.allVehicles[page]){
            objectShareService.setLoader(true);
            objectShareService.getLoader();

            if(!$scope.stillProcess){
                $scope.stillProcess = true;
                vehicleService.getVehicles({
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
                            $scope.allVehicles[page] = response;
                            $scope.vehicles = $scope.allVehicles[page];
                            $scope.setIdOfVehicle($scope.allVehicles);
                            var encrypted =
                                storageService.encryptData(
                                    JSON.stringify($scope.allVehicles), keyEncryption
                                ).toString();
                            storageService.saveIntoLocalStorage(keyStorage, encrypted);
                        }
                    });
            }

        }else{
            $scope.vehicles = $scope.allVehicles[page];
            $scope.currentPage = page;
            $scope.pageArray = $scope.getNumber(page);
            $scope.setIdOfVehicle($scope.allVehicles);
        }

    };

    $scope.setIdOfVehicle = function setIdOfVehicle(allVehicles){
        for(var i=0; i<$scope.pageArray.length; i++){
            var index = $scope.pageArray[i];
            var vehicles = allVehicles[index];
            if(vehicles && vehicles.results){
                for(var j=0; j<vehicles.results.length; j++){
                    var vehicle = vehicles.results[j];
                    if(vehicle.url){
                        var splits = vehicle.url.split("/");
                        var id = splits[splits.length-2];
                        vehicle.id = id;
                    }
                }
            }
        }
    };

    // init with page 1
    $scope.getDatas(1);

}
/**
 * Created by irfan.maulana on 6/28/2016.
 */
'use strict';
var peopleModule = angular.module('people-module.controller', []);
peopleModule.controller('people.ctrl',
        ['$scope', '$q', 'peopleService', 'objectShareService', 'storageService', peopleCtrl
    ]);
peopleModule.controller('people-detail.ctrl',
    ['$scope', '$routeParams', 'peopleDetailService', 'objectShareService', 'storageService', peopleDetailCtrl
    ]);

function peopleDetailCtrl($scope, $routeParams, peopleDetailService, objectShareService, storageService){
    $scope.id = $routeParams.id;

    peopleDetailService.getPersonById({
        id: $scope.id
    })
    .$promise
    .then(function (response) {
        objectShareService.setLoader(false);
        objectShareService.getLoader();
        $scope.people = response;
    });
}

function peopleCtrl($scope, $q, peopleService, objectShareService, storageService){
    objectShareService.setTabActive("people");
    $scope.tabActive = objectShareService.getTabActive();

    $scope.people = {
        "count": 0,
        "next": null,
        "previous": null,
        "result": []
    };
    $scope.allPeople = {};
    $scope.currentPage = 1;
    $scope.pageArray = [1];
    var keyStorage = storageService.md5hash("people");
    var keyEncryption = storageService.md5hash("people-starwars");
    $scope.stillProcess = false;


    $scope.getNumber = function(num) {
        var res = [];
        for (var i = 0; i < num; i++) {
            res.push(i+1);
        }
        return res;
    };

    $scope.checkStorage = function checkStorage(){

        var peopleTemp = storageService.readFromLocalStorage(keyStorage);
        if(peopleTemp){
            var str = storageService.decryptData(peopleTemp, keyEncryption);
            try {
                var temp = JSON.parse(str);
                $scope.allPeople = temp;
            }catch (err){};
        }

    };

    $scope.nextPeoplePage = function nextPage(){
        if($scope.people && $scope.people.next !== null){
            var page = $scope.people.next.split("?page=");
            if(page.length === 2){
                page = page[1];
                $scope.getDatas(page);
                var offset = $("#people-page-"+page).offset();
                if(offset){
                    $('html, body').animate({
                        scrollTop: offset.top
                    }, 200);
                }
            }
        }
    };

    $scope.previousPeoplePage = function previousPage(){
        if($scope.people && $scope.people.previous !== null){
            var page = $scope.people.previous.split("?page=");
            if(page.length === 2){
                page = page[1];
                $scope.getDatas(page);
            }
        }
    };

    $scope.getDatas = function getDatas(page){
        $scope.checkStorage();
        if(!$scope.allPeople[page]){
            objectShareService.setLoader(true);
            objectShareService.getLoader();

            if(!$scope.stillProcess){
                $scope.stillProcess = true;
                peopleService.getPeople({
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
                            $scope.allPeople[page] = response;
                            $scope.people = $scope.allPeople[page];
                            $scope.setIdOfPeople($scope.allPeople);
                            var encrypted =
                                storageService.encryptData(
                                    JSON.stringify($scope.allPeople), keyEncryption
                                ).toString();
                            storageService.saveIntoLocalStorage(keyStorage, encrypted);
                        }
                    });
            }

        }else{
            $scope.people = $scope.allPeople[page];
            $scope.currentPage = page;
            $scope.pageArray = $scope.getNumber(page);
            $scope.setIdOfPeople($scope.allPeople);
        }

    };

    $scope.setIdOfPeople = function setIdOfPeople(allPeople){
        for(var i=0; i<$scope.pageArray.length; i++){
            var index = $scope.pageArray[i];
            var peoples = allPeople[index];
            if(peoples && peoples.results){
                for(var j=0; j<peoples.results.length; j++){
                    var people = peoples.results[j];
                    if(people.url){
                        var splits = people.url.split("/");
                        var id = splits[splits.length-2];
                        people.id = id;
                    }
                }
            }
        }
    };

    // init with page 1
    $scope.getDatas(1);

}
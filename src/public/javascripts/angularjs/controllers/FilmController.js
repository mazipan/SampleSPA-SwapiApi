/**
 * Created by irfan.maulana on 6/28/2016.
 */
'use strict';
var filmModule = angular.module('film-module.controller', []);
filmModule.controller('film.ctrl',
        ['$scope', '$q', 'filmService', 'objectShareService', 'storageService', filmCtrl
    ]);

function filmCtrl($scope, $q, filmService, objectShareService, storageService){

    objectShareService.setTabActive("film");
    $scope.tabActive = objectShareService.getTabActive();

    $scope.films = {
        "count": 0,
        "next": null,
        "previous": null,
        "result": []
    };
    $scope.allFilms = {};
    $scope.currentPage = 1;
    $scope.pageArray = [1];
    var keyStorage = storageService.md5hash("films");
    var keyEncryption = storageService.md5hash("films-starwars");
    $scope.stillProcess = false;


    $scope.getNumber = function(num) {
        var res = [];
        for (var i = 0; i < num; i++) {
            res.push(i+1);
        }
        return res;
    };

    $scope.checkStorage = function checkStorage(){

        var filmsTemp = storageService.readFromLocalStorage(keyStorage);
        if(filmsTemp){
            var str = storageService.decryptData(filmsTemp, keyEncryption);
            try {
                var temp = JSON.parse(str);
                $scope.allFilms = temp;
            }catch (err){};
        }

    };

    $scope.nextFilmPage = function nextPage(){
        if($scope.films && $scope.films.next !== null){
            var page = $scope.films.next.split("?page=");
            if(page.length === 2){
                page = page[1];
                $scope.getDatas(page);
                var offset = $("#film-page-"+page).offset();
                if(offset){
                    $('html, body').animate({
                        scrollTop: offset.top
                    }, 200);
                }
            }
        }
    };

    $scope.previousFilmPage = function previousPage(){
        if($scope.films && $scope.films.previous !== null){
            var page = $scope.films.previous.split("?page=");
            if(page.length === 2){
                page = page[1];
                $scope.getDatas(page);
            }
        }
    };

    $scope.getDatas = function getDatas(page){
        $scope.checkStorage();
        if(!$scope.allFilms[page]){
            objectShareService.setLoader(true);
            objectShareService.getLoader();

            if(!$scope.stillProcess){
                $scope.stillProcess = true;
                $scope.currentPage = page;
                $scope.pageArray = $scope.getNumber(page);
                filmService.getFilms({
                    page: page
                })
                    .$promise
                    .then(function (response) {
                        $scope.stillProcess = false;
                        objectShareService.setLoader(false);
                        objectShareService.getLoader();

                        if(response){
                            $scope.allFilms[page] = response;
                            $scope.films = $scope.allFilms[page];
                            var encrypted =
                                storageService.encryptData(
                                    JSON.stringify($scope.allFilms), keyEncryption
                                ).toString();
                            storageService.saveIntoLocalStorage(keyStorage, encrypted);
                        }
                    });
            }

        }else{
            $scope.films = $scope.allFilms[page];
            $scope.currentPage = page;
            $scope.pageArray = $scope.getNumber(page);
        }

    };

    // init with page 1
    $scope.getDatas(1);
}
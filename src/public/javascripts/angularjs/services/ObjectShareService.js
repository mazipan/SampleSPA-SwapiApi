/**
 * Created by irfan.maulana on 6/29/2016.
 */
/**
 * Created by irfan.maulana on 6/29/2016.
 */
/*
 * @author : irfan.maulana
 */
var objectSharingModuleService = angular.module('object-share-module.service', []);

objectSharingModuleService
    .factory('objectShareService', ['$rootScope', function objectShareServiceFunc($rootScope){
        var tabActive = "";
        var isLoading = false;
        var obj = {
            setTabActive :  function setTabActive(tabName){
                if(tabName){
                    tabActive = tabName;
                }
            },
            getTabActive : function getTabActive(){
                return tabActive;
            },
            setLoader :  function setLoader(OnOrOff){
                if(typeof OnOrOff !== 'undefined'){
                    isLoading = OnOrOff;
                }
            },
            getLoader : function getLoader(){
                return isLoading;
            }
        };

        return obj;
    }]);


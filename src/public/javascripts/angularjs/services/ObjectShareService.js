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
    .factory('objectShareService', [function objectShareServiceFunc(){

        var tabActive = "";
        var obj = {
            setTabActive :  function setTabActive(tabName){
                if(tabName){
                    tabActive = tabName;
                }
            },
            getTabActive : function getTabActive(){
                return tabActive;
            }
        };

        return obj;
    }]);


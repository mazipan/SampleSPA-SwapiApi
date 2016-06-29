/**
 * Created by irfan.maulana on 6/29/2016.
 */
/*
 * @author : irfan.maulana
 */
var storageModuleService = angular.module('storage-module.service', []);

storageModuleService
    .factory('storageService', [function storageServiceFunc(){

        var result = {

            saveIntoLocalStorage :  function saveIntoLocalStorage(key, stringData){
                if(typeof localStorage !== "undefined"){
                    localStorage.setItem(key, stringData);
                    return true;
                }else return false;
            },

            readFromLocalStorage : function readFromLocalStorage(key){
                if(typeof localStorage !== "undefined"){
                    return localStorage.getItem(key);
                }else return null;
            },

            saveIntoSessionStorage :  function saveIntoSessionStorage(key, stringData){
                if(typeof sessionStorage !== "undefined"){
                    sessionStorage.setItem(key, stringData);
                    return true;
                }else return false;
            },

            readFromSessionStorage : function readFromSessionStorage(key){
                if(typeof sessionStorage !== "undefined"){
                    return sessionStorage.getItem(key);
                }else return null;
            },

            encryptData : function encryptData(stringWillBeEncripted, key){
                if(typeof CryptoJS !== "undefined"){
                    return CryptoJS.AES.encrypt(
                        stringWillBeEncripted,
                        key).toString();
                }else return stringWillBeEncripted;
            },

            decryptData : function decryptData(stringWillBeDecripted, key){
                if(typeof CryptoJS !== "undefined"){
                    return CryptoJS.AES.decrypt(
                        stringWillBeDecripted,
                        key)
                        .toString(CryptoJS.enc.Utf8);
                }else return stringWillBeDecripted;
            },

            setCookie : function(key, value, expireInDays){
                var d = new Date();
                d.setTime(d.getTime() + (expireInDays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = key + "=" + value + "; " + expires;
            },

            getCookie : function(key){
                var name = key + "=";
                var ca = document.cookie.split(';');
                for(var i=0; i<ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0)===' ') c = c.substring(1);
                    if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
                }
                return "";
            },

            md5hash : function(string){
                if(typeof MD5 !== "undefined"){
                    return MD5(string);
                }else return string;
            }

        };


        return result;
    }]);


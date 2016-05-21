/*
 * Cookie - Cookie getter / setter
 *
 * An additional modules of CokeUtil, also indenpendent usage as Cookie.
 *
 * Released under the MIT license
 *
 * See https://github.com/riotkkwok/CokeUtil for details
 *
 * Auther: Rio Kwok
 *
 * Version: 0.1.1
 *
 * Updates: 
 * 1. fix the expires failure issue
 *
 */

!function(factory){
    if(typeof exports === 'object' && typeof module !== 'undefined'){
        // CMD
        modul.exports = factory();
    }else if(typeof define === 'function' && define.amd){
        // AMD
        define(factory);
    } else {
        // Browser globals
        if(window.CokeUtil){
            window.CokeUtil.Cookie = factory();
        }else{
            window.Cookie = factory();
        }
    };
}(function(){
    var Cookie = {};

    Cookie.get = function(name){
        var str = document.cookie.replace(/ /g, ''), rg = new RegExp('(?:;)?'+name+'=([^;]*)');
        var result = rg.exec(str);
        if(result.length>1){
            return result[1];
        }else{
            return undefined;
        }
    };

    Cookie.getAll = function(){
        var index, obj = {}, list = document.cookie.replace(/ /g, '').split(';');
        for(var i=0; i<list.length; i++){
            index = list[i].indexOf('=');
            if(index<0){
                continue;
            }
            obj[list[i].substring(0, index)]=list[i].substring(index);
        }
        return obj;
    };

    Cookie.isHas = function(name){
        if(this.get(name) !== undefined){
            return true;
        }else{
            return false;
        }
    };

    Cookie.set = function(name, val, options){
        var str = '';
        if(arguments.length === 1 && typeof name === 'object'){
            if(!object.name || !object.val){
                return false;
            }
            str += object.name+'='+object.val+'; ';
        }else if(arguments.length === 2){
            str += name+'='+val+'; ';
            return document.cookie = str;
        }else{
            str += name+'='+val+'; ';
        }
        str += (object.domain ? 'domain='+object.domain+'; ' : '')
            + (object.path ? 'path='+object.path+'; ' : '')
            + (object.expires ? 'expires='+object.expires.toUTCString()+'; ' : '')
            + (object.secure ? 'secure=secure; ' : '');
        return document.cookie = str;
    };

    return Cookie;
});
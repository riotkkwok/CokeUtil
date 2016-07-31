/*
 * UCookie - Cookie getter / setter
 *
 * An additional modules of CokeUtil, also indenpendent usage as UCookie.
 *
 * Released under the MIT license
 *
 * See https://github.com/riotkkwok/CokeUtil for details
 *
 * Auther: Rio Kwok
 *
 * Version: 1.0.0
 *
 * Updates: 
 * 1. rename as UCookie
 * 2. bug fix
 * 3. update serveral lines of code to follow the JSLint's rule
 *
 */

(function(factory){
    if(typeof exports === 'object' && typeof module !== 'undefined'){
        // CMD
        modul.exports = factory();
    }else if(typeof define === 'function' && define.amd){
        // AMD
        define(factory);
    } else {
        // Browser globals
        if(window.CokeUtil){
            window.CokeUtil.UCookie = factory();
        }else{
            window.UCookie = factory();
        }
    }
})(function(){
    var UCookie = {};

    UCookie.get = function(name){
        var str = document.cookie.replace(/ /g, ''), rg = new RegExp('(?:;)?'+name+'=([^;]*)');
        var result = rg.exec(str);
        if(!result){
            return undefined;
        }
        if(result.length>1){
            return result[1];
        }else{
            return undefined;
        }
    };

    UCookie.getAll = function(){
        var index, obj = {}, list = document.cookie.replace(/ /g, '').split(';');
        for(var i=0; i<list.length; i++){
            index = list[i].indexOf('=');
            if(index<0){
                continue;
            }
            obj[list[i].substring(0, index)]=list[i].substring(index+1);
        }
        return obj;
    };

    UCookie.isHas = function(name){
        if(this.get(name) !== undefined){
            return true;
        }else{
            return false;
        }
    };

    UCookie.set = function(name, val, options){
        var str = '';
        if(arguments.length === 1 && typeof name === 'object'){
            if(!object.name || !object.val){
                return false;
            }
            str += object.name+'='+object.val+'; ';
        }else if(arguments.length === 2){
            document.cookie = str += name+'='+val+'; ';
            return document.cookie;
        }else{
            str += name+'='+val+'; ';
        }
        document.cookie = str += (object.domain ? 'domain='+object.domain+'; ' : '') +
            (object.path ? 'path='+object.path+'; ' : '') + 
            (object.expires ? 'expires='+object.expires.toUTCString()+'; ' : '') + 
            (object.secure ? 'secure=secure; ' : '');
        return document.cookie;
    };

    return UCookie;
});
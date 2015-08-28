/*
 * CokeUtil - a set of utility methods
 *
 * Released under the MIT license
 *
 * See https://github.com/riotkkwok/CokeUtil for details
 *
 * Auther: Rio Kwok
 *
 * Version: 0.1.0
 *
 * Updates: 
 * 1. Comment update.
 * 2. Add userAgent checking for IE, weibo and YY.
 * 3. Add killKeyboard method (mainly for mobile).
 *
 */

;(function(){
    var CokeUtil = function(){};

    var ua = window.navigator.userAgent, param;

    /**
     * Specify the format(string) to parse the date object to string.
     *
     * @param {Date} Date object to be parsed
     * @param {string} The format to be returned,
     *        Y - one digit of year
     *        M - one digit of month
     *        D - one digit of day
     *        h - one digit of hour
     *        m - one digit of minute
     *        s - one digit of second
     * @returns {string}
     */
    CokeUtil.prototype.formatDate = function(date, format){
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var result = format, tmpObj = {};

        if(!date instanceof Date){
            try{
                console.error('The argument \'date\' is not a Date Object.');
            }catch(e){}
            return '';
        }
        if(typeof format !== 'string'){
            try{
                console.error('The argument \'format\' is not a string.');
            }catch(e){}
            return '';
        }

        function toString(ch, val){
            var start = result.indexOf(ch);
            if(start < 0){
                return '';
            }
            for(var i=1; i<result.length; i++){
                if(result[start + i] !== ch){
                    break;
                }
            }
            if(ch === 'M'){
                if(i > 3){
                    result = result.replace(result.substring(start, start + i), months[val-1]);
                }else if(i === 3){
                    result = result.replace(result.substring(start, start + i), months[val-1].substr(0, i));
                }else{
                    result = result.replace(result.substring(start, start + i), ('0'+val).toString().substr(-1 * i));
                }
            }else if(ch === 'Y'){
                result = result.replace(result.substring(start, start + i), val.toString().substr(-1 * i));
            }else{
                result = result.replace(result.substring(start, start + i), ('0'+val).toString().substr(-1 * i));
            }
        }

        tmpObj.year = date.getFullYear();
        tmpObj.month = date.getMonth() + 1;
        tmpObj.day = date.getDate();
        tmpObj.hour = date.getHours();
        tmpObj.minute = date.getMinutes();
        tmpObj.second = date.getSeconds();

        toString('Y', tmpObj.year)
        toString('D', tmpObj.day)
        toString('h', tmpObj.hour)
        toString('m', tmpObj.minute)
        toString('s', tmpObj.second)
        toString('M', tmpObj.month);

        return result;
    };


    /**
     * Compare the versions.
     *
     * @param {string} version number string, likes 10.1, 2.3.4, 1.0.0.2
     * @param {string} version number string, likes 10.1, 2.3.4, 1.0.0.2
     * @returns {number|null} -1, 0, 1
     */
    CokeUtil.prototype.compareVers = function(ver1, ver2){
        if(typeof ver1 !== 'string' || typeof ver2 !== 'string' || ver1.length === 0 || ver2.length === 0){
            return null;
        }
        if(ver1 === ver2){
            return 0;
        }
        var re1 = ver1.split('.'), re2 = ver2.split('.');
        for(var i = 0; i<re1.length && i<re2.length; i++){
            if(parseInt(re1[i], 10) > parseInt(re2[i], 10)){
                return 1;
            }else if(parseInt(re1[i], 10) < parseInt(re2[i], 10)){
                return -1;
            }
        }
        if(parseInt(re1[i] || '0', 10) > parseInt(re2[i] || '0', 10)){
            return 1;
        }else if(parseInt(re1[i] || '0', 10) < parseInt(re2[i] || '0', 10)){
            return -1;
        }else{
            return 0;
        }
    };


    /**
     * Get the value of specified param.
     *
     * @param {string} the param name
     * @param {boolean} to re-parse the URL param or not
     * @returns {string|null}
     */
    CokeUtil.prototype.getURLParam = function(name, isRenew){
        var re = /(?:\?|&)([^&=]*)=?([^&]*)/g;
        if(name === null || name === undefined || name === ''){
            return null;
        }
        if(isRenew || !param){
            param = {};
            window.location.search.replace(re, function () {
                if (arguments[1]) {
                    param[arguments[1]] = arguments[2];
                }
                return '';
            });
        }
        return (param[name] === "" ) ? null : param[name];
    };


    CokeUtil.prototype.killKeyboard = function(){
        try {
            if(document.activeElement && document.activeElement.nodeName.toLowerCase() != 'body') {
                document.activeElement.blur();
            } else {
                for(var i=0; i<document.querySelectorAll('input, textarea, select').length; i++){
                    document.querySelectorAll('input, textarea, select')[i].blur();
                }
            }
        } catch(e) {}    
    };


    /**
     * user agent info
     *
     */
    CokeUtil.prototype.userAgent = {

        /* OS checking [start] */
        isIOS: /iPhone|iPod|iPad/i.test(ua),
        isAndroid: /Android/i.test(ua),
        /* OS checking [end] */

        /* App checking [start] */
        isWeiXin: /MicroMessenger/i.test(ua),
        isWeibo: /weibo/i.test(ua),
        isYY: /.*YY/.test(ua),
        /* App checking [end] */

        /* Browser checking [start] */
        isChrome: /chrome/i.test(ua),
        isUCWEB: /UCWEB|UCBrowser/i.test(ua),
        isOpera: /Opera|Oupeng/i.test(ua),
        isFireFox: /Firefox/i.test(ua),
        isQQBrowser: /MQQBrowser/i.test(ua),
        is360Browser: /360 Aphone Browser/i.test(ua),
        isLieBao: /LieBao/i.test(ua),
        isBaiduBrowser: /baidubrowser/i.test(ua),
        isIE: /(MSIE).*(Windows).*(Trident)?/i.test(ua),
        /* Browser checking [end] */

        /* Device checking [start] */
        isSmartis: /SANFRANCISCO/i.test(ua),
        /* Device checking [end] */
    };


    window.CokeUtil = CokeUtil;
})();
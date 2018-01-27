/*
 * UString - String handler
 *
 * An additional modules of CokeUtil, also indenpendent usage as UString.
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
 * 1. initial
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
            window.CokeUtil.UString = factory();
        }else{
            window.UString = factory();
        }
    }
}(function(){
    var UString = {};

    UString.parseXML = function(data) {
        var xml, tmp;
        if (!data || typeof data !== "string") {
            return null;
        }
        try {
            if (window.DOMParser) { // Standard
                tmp = new DOMParser();
                xml = tmp.parseFromString(data, "text/xml");
            } else { // IE
                xml = new window.ActiveXObject("Microsoft.XMLDOM");
                xml.async = "false";
                xml.loadXML(data);
            }
        } catch(e) {
            xml = undefined;
        }
        if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
            xml = undefined;
        }
        return xml;

    };

    /**
     * Get the limited string / limitation result of the string
     *
     * @param {string} the string to be limited
     * @param {number} maxLength number
     * @param {number} the mode of limitation, 
     *     0 is to return limited string
     *     1 is to return the string is larger than maxLength or not
     * @returns {string|boolean}
     */
    UString.limitWords = function(str, maxLen, mode) {
        var totalLength = 0;
        var charCode, newStr = null, result = true;
        if(!Number.isInteger(maxLen)){
            return undefined;
        }
        for (var i = 0; i < str.length; i++) {
            charCode = str.charCodeAt(i);
            if (charCode <= 0x007f) {
                totalLength += 1;
            } else if (charCode <= 0x07ff) {
                totalLength += 2;
            } else if (charCode <= 0xffff) {
                totalLength += 3;
            } else {
                totalLength += 4;
            }
            if (totalLength > maxLen) {
                newStr = str.substring(0, i);
                result = false;
                break;
            }
        }
        if (newStr === null) {
            newStr = str;
        }
        return !mode ? newStr : (mode === 1 ? result : undefined);
    };

    UString.escapeHTML = function(str){
        var eMap = {
            '<': '&#60;',
            '>': '&#62;',
            '"': '&#34;',
            "'": '&#39;',
            '&': '&#38;',
            '/': '&#x2F'
        };
        if(typeof str !== 'string'){
            return str;
        }
        return str.replace(/[<>"'&\/]/g, function(s){
            return eMap[s];
        });
    };

    return UString;
});
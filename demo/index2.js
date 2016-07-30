define('util', ['../cokeUtil', '../promise'], function(u, p){
    u.Promise = p;
    return u;
});

require(['util'], function(util){
    var getElm = function(id){
            return document.querySelector(id);
        };
    getElm('#dateString').innerHTML = util.formatDate(new Date, 'YYYY/MM/DD hh:mm:ss');
    getElm('#versionCompare').innerHTML = util.compareVers('1.0.2', '1.0.10');
    getElm('#urlParam').innerHTML = util.getURLParam('name');
    getElm('#isIOS').innerHTML = util.UA.isIOS;
    getElm('#isAndroid').innerHTML = util.UA.isAndroid;
    getElm('#isWeiXin').innerHTML = util.UA.isWeiXin;
    getElm('#isWeibo').innerHTML = util.UA.isWeibo;
    getElm('#isChrome').innerHTML = util.UA.isChrome;
    getElm('#isUCWEB').innerHTML = util.UA.isUCWEB;
    getElm('#isOpera').innerHTML = util.UA.isOpera;
    getElm('#isQQBrowser').innerHTML = util.UA.isQQBrowser;
    getElm('#is360Browser').innerHTML = util.UA.is360Browser;
    getElm('#isLieBao').innerHTML = util.UA.isLieBao;
    getElm('#isBaiduBrowser').innerHTML = util.UA.isBaiduBrowser;
    getElm('#isIE').innerHTML = util.UA.isIE;
    getElm('#isSmartis').innerHTML = util.UA.isSmartis;
    getElm('#isIPad').innerHTML = util.UA.isIPad;

    var p1 = new util.UPromise(), p2 = new util.UPromise(), p3 = new util.UPromise();
    p1.then(function(){
        var that = this;
        getElm('#pp1').innerHTML = +new Date;
        p2.resolve();
        setTimeout(function(){
            that.next();
        }, 500);
    }, true).then(function(){
        p3.resolve();
    });
    p2.then(function(){
        getElm('#pp2').innerHTML = +new Date;
    });
    p3.then(function(){
        getElm('#pp3').innerHTML = +new Date;
    });
    util.UPromise.when(p1, p2).then(function(){
        getElm('#pwhen').innerHTML = +new Date;
    });
    p1.resolve();
});

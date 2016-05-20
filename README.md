# CokeUtil
CokeUtil - a set of utility methods, hopes it is common and easy to use just as to buy and to drink the Coke. CokeUtil 是一个工具方法的集合，希望它能像买和喝可乐一样简单方便的使用。

## Loading
Simply include the Javascript in your HTML as below:

    <script type="text/javascript" src="cokeUtil.js"></script>


## Demo

    var cokeUtil = new CokeUtil(); 
    var dateStr = cokeUtil.formatDate(new Date(), 'YYYY-MM'), // '2015-08' 
        isLatest = cokeUtil.compareVers('1.1.3', '1.1.2'), // 1 
        isIOS = cokeUtil.userAgent.isIOS, // true 
        isChrome = cokeUtil.userAgent.isChrome; // false 


## API & Attribute

### cokeUtil.formatDate(Date, string)
toString the Date object with specified string format.

About the format, 
Y - year, M - month, D - day, h - hour, m - minute, s - second
for example:

    'YY-MM-DD'
    'YYYY-MM-DD'
    'YYYY/MM/DD'
    'YYYY-MMM-DD'
    'YYYY-MM-DD hh:mm:ss'
    ...

### cokeUtil.compareVers(ver1, ver2)
to compare the versions, 
if ver1 is greater than ver2, return 1;
if ver1 is less than ver2, return -1;
if ver1 equals to ver2, return 0.
Return null if the arguments are incorrect.

### cokeUtil.killKeyboard()
to kill keyboard for mobile webview / browser.

### cokeUtil.userAgent
to get the userAgent info, it is an object with the device / browser checking result.
For example, isIOS / isAndroid / isWeiXin(check if it is in WeChat) / isChrome / isFireFox / ...


## Additional Modules

### Promise
Promises API, an additional modules of CokeUtil, also indenpendent usage as Promise.

With CokeUtil:

    var p = new CokeUtil.Promise();
    p.then(function(){
        ...
    });
    ...
    p.resolve();
    
Without CokeUtil:

    var p = new Promise();
    p.then(function(){
        ...
    });
    ...
    p.resolve();


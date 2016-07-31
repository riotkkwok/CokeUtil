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

### UPromise
Promises API, an additional modules of CokeUtil, also indenpendent usage as UPromise.

With CokeUtil:

    var p = new CokeUtil.UPromise();
    p.then(function(){
        ...
    });
    ...
    p.resolve();
    
Without CokeUtil:

    var p = new UPromise();
    p.then(function(){
        ...
    });
    ...
    p.resolve();


### Cookie
Cookie getter / setter, an additional modules of CokeUtil, also indenpendent usage as UCookie.

With CokeUtil:

    CokeUtil.UCookie.get('username');
    CokeUtil.UCookie.getAll();
    CokeUtil.UCookie.isHas('username');
    CokeUtil.UCookie.set('username', 'Jack');
    CokeUtil.UCookie.set('username', 'Jack', {
        domain: 'a.test.com',
        path: '/b',
        expires: new Date('2016/12/31'),
        secure: true
    });
    CokeUtil.UCookie.set({
        name: 'username',
        val: 'Jack',
        domain: 'a.test.com',
        path: '/b',
        expires: new Date('2016/12/31'),
        secure: true
    });
    
Without CokeUtil:

    UCookie.get('username');
    UCookie.getAll();
    UCookie.isHas('username');
    UCookie.set('username', 'Jack');
    UCookie.set('username', 'Jack', {
        domain: 'a.test.com',
        path: '/b',
        expires: new Date('2016/12/31'),
        secure: true
    });
    UCookie.set({
        name: 'username',
        val: 'Jack',
        domain: 'a.test.com',
        path: '/b',
        expires: new Date('2016/12/31'),
        secure: true
    });


### UString
String handler, an additional modules of CokeUtil, also indenpendent usage as UString.

With CokeUtil:

    CokeUtil.UString.parseXML('<html></html>');
    CokeUtil.UString.escapeHTML('"123好好阿海abkj2w><j//&');
    CokeUtil.UString.limitWords('123好好阿海abkj2wj', 10);
    CokeUtil.UString.limitWords('123好好阿海abkj2wj', 10, 1);
    
Without CokeUtil:

    UString.parseXML('<html></html>');
    UString.escapeHTML('"123好好阿海abkj2w><j//&');
    UString.limitWords('123好好阿海abkj2wj', 10);
    UString.limitWords('123好好阿海abkj2wj', 10, 1);

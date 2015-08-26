# CokeUtil
CokeUtil - a set of utility methods, hopes it is common and easy to use just as buying and drinking the Coke. CokeUtil 是一个工具方法的集合，希望它能像买和喝可乐一样简单方便的使用。

## Loading
Simply include the Javascript in your HTML as below:

  <script type="text/javascript" src="cokeUtil.js"></script>


## Demo

  var Util = new CokeUtil(); 
  var dateStr = Util.formatDate(new Date(), 'YYYY-MM'), // '2015-08' 
      isLatest = Util.compareVers('1.1.3', '1.1.2'), // 1 
      isIOS = Util.userAgent.isIOS, // true 
      isChrome = Util.userAgent.isChrome; // false 

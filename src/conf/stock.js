var _ = require('underscore');
/**
 * http://cjhq.baidu.com/data/sh/601988.sh.xml
 *
 */

var stock_sh = [
	601398,
	601900
];

var stock_sz = [
	'000002',
	'300271',
];


/**
 * http://fund.stockstar.com/funds/fundallcode.htm
 */
var fund_sh = [
	'500056',
	'510700',
];
var fund_sz = [
	'184722',
	'159909',
];

/**
 * 板块
 * 行业板块数据
 * 'http://data.bestgo.com/query/bgxview-2.ashx?time=1426777380&stockcode=B%24'+993707+'&_=1426820840311'
 * http://data1.bestgo.com/stockdata/SH600036/kweek.js 
 * http://data1.bestgo.com/stockdata/SH600036/kday.js --- 半年的数据
 * http://data1.bestgo.com/stockdata/B$991002/kweek.js
 */

var stock_bk = [
	'991002'
];

// (function(){
// 	stock_bk = [];
// 	for(var i=0; i< 10000; i++){
// 		if(i<10){
// 			stock_bk.push('99000'+ i);
// 		}else if(i<100){
// 			stock_bk.push('9900'+ i);
// 		}else if(i<1000){
// 			stock_bk.push('990' + i);
// 		}else{
// 			stock_bk.push('99' + i);
// 		}
// 	}
// })();

var stock = {
	sh: _.union(stock_sh,fund_sh),
	sz: _.union(stock_sz,fund_sz),
	bk: stock_bk,
};



exports = module.exports = stock;
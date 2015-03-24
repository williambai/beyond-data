var mongoose = require('mongoose');

var Schema = mongoose.Schema;

exports = module.exports = function(){
	var StockSchema = new Schema({
		code: Number,//股票代码
		time: Number,//交易时间
		highest: Number,//最高价
		lowest: Number, //最低价
		opened: Number, //开盘价
		closed: Number, //收盘价
		volume: Number, //成交量
		zi_jin_li_du: Number, //资金力度(%)
		yin_dan_li_du: Number, //隐单力度(%)
		unknown_1: Number,
		ddx: Number, // 大单动向(DDX)
		unknown_2: Number,
		unknown_3: Number,
		te_da_dan_cha: Number, //特大单差(%)
		unknown_4: Number,
		unknown_5: Number,
		unknown_6: Number
	});
	mongoose.model('Stock', StockSchema);
};

/**
 * sample data:
 * 
 */
// 2015/03/20,
// 5241.15,最高价
// 5112.335,最低价
// 5181.903,开盘价
// 5145.236,收盘价
// 5742.91,成交量
// -0.0007,资金力度(%)
// -0.1211,隐单力度(%)
// 0.693,
// -0.364,大单动向(DDX)
// -0.511,
// -31.056,
// -10.5,特大单差(%)
// 0.9,
// 2.7,
// 6.9
// \n


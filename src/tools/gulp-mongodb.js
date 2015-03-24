var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var util = require('./util');
var _ = require('underscore');

var stockArrayBuilder = function(code,contents){
	contents = contents || '';
	var fields = [
		'code',
		'time',
		'highest',//最高价
		'lowest', //最低价
		'opened', //开盘价
		'closed', //收盘价
		'volume', //成交量
		'zi_jin_li_du', //资金力度(%)
		'yin_dan_li_du', //隐单力度(%)
		'unknown_1',
		'ddx', // 大单动向(DDX)
		'unknown_2',
		'unknown_3',
		'te_da_dan_cha', //特大单差(%)
		'unknown_4',
		'unknown_5',
		'unknown_6'
	];
	var stocks = [];
	var lines = contents.split('\\n');
	// console.log(lines);
	lines.forEach(function(line){
		var arr = line.split(',');
		arr.unshift(code);
		arr[1] = arr[1].match(/([0-9]+)/g).join('');
		stocks.push(_.object(fields,arr));
	});
	return stocks;
}

exports = module.exports = function(mongoose,model){
	return through.obj(function(file,env,next){
		if(file.isNull()){
			return next();
		}
		if(file.isStream()){
			this.emit('error', new PlugError('mongodb','can not support stream.'));
			return next();
		}
		if(file.isBuffer()){
			var Stock = mongoose.model(model);
			var code = file.relative.split('.')[0].substr(2);
			var stocks = stockArrayBuilder(code,String(file.contents));
			mongoose.connect('mongodb://localhost/economics');
			Stock.create(stocks,function(err){
				if(err) throw err;
				process.stdout.write('.');
				mongoose.disconnect();
				return next();
			});
		}
	});
};;

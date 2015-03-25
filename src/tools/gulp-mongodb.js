var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var util = require('./util');
var _ = require('underscore');
var fs = require('fs');

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

var storeFromFiles = function(mongoose,model){
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
};

var fetchIntoFiles = function(mongoose,model,next){
	mongoose.connect('mongodb://localhost/economics');
	var Stock = mongoose.model(model);
	Stock.find().select('code time opened closed -_id').sort('-code').exec(function(err,codes){
		// console.log(codes);
		if(err) throw err;
		var _times = _.sortBy(_.union(_.pluck(codes,'time'))).reverse();
		// console.log(_times);
		var _codes = _.sortBy(_.union(_.pluck(codes,'code')));
		// console.log(_codes);
		var output = [];
		for(var i=0; i<_times.length; i++){
			output[i] = [];
			for(var j=0; j<_codes.length; j++){
				output[i][j] = '0.00';
			}
		}
		codes.forEach(function(transaction){
			// console.log(transaction);
			var i = _.indexOf(_times,transaction.time);
			var j = _.indexOf(_codes,transaction.code);
			// console.log(i + '-' + j);
			output[i][j] = (100.00*(transaction.closed-transaction.opened)/transaction.opened).toFixed(2);
			// console.log(output[i][j]);
		})
		// console.log(output[10].length);
		for(j=0 ;j< _codes.length; j++){
			var predictData = '',testData = '';
			for(i = 0; i< _times.length; i++){
				var line = output[i].join(',');
				var isMatched = line.match(/0\.00/g);
				if(!isMatched || isMatched.length < 50){
					var goodOrBad = Math.abs(output[i][j]) > 2.0 ? 1 : 0; //涨跌幅超过2%
					var middle = '';
					for(var k=0; k<_codes.length; k++){
						middle += (k+1) + ':' + output[i][k] + ' ';
					}
					middle += '\n';
					if(i<10){
						testData += goodOrBad + ' ' + middle;
					}else{
						predictData += goodOrBad + ' ' + middle;
					}
				}
			}
			fs.writeFileSync('./dest/svm/train/'+_codes[j] + '.dat',predictData);
			fs.writeFileSync('./dest/svm/test/'+_codes[j] + '.dat',testData);
		}
		mongoose.disconnect();
	});
}

exports = module.exports = {
	storeFromFiles: storeFromFiles,
	fetchIntoFiles: fetchIntoFiles,
}

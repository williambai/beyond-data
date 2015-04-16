var fs = require('fs');
var path = require('path');
var xml2js = require('xml2js');
var _ = require('underscore');
var economics_cn = require('../../conf/economics').all;

exports = module.exports = (function(){
	var Economics = function(src,dest){
		// DEBUG && console.log('++');
		this.src = src || './';
		this.dest = dest || './';
	};

	Economics.a = function(){
		console.log('a');
		return 'a';
	};
	Economics.prototype.execFile = function(files,callback){
		var that = this;
		var file = files.shift();
		if(file == undefined){
			callback();
			return;
		}
		if(!/yin_hang_jian_chai_jie_li_lv/.test(file) &&
			!/gu_piao_zhang_hu_tong_ji/.test(file) &&
			!/you_jia_tiao_zheng/.test(file) &&
			!/xin_fang_jia_ge_zhi_shu/.test(file) &&
			!/li_lv_tiao_zheng/.test(file) &&
			!/us_li_lv/.test(file)
			){
			var content = fs.readFileSync(path.join(this.src,file),{encoding:'utf8'});
			that._parse(content,file);
		}
		//recusion
		that.execFile(files,callback);
	};

	Economics.prototype._parse = function(content,filename){
		// var country = filename.slice(0,2);
		var options = _.findWhere(economics_cn,{filename:filename.slice(3)});
		// options.country = country;
		console.log(options);
		var lines = content.split('\n');
		this._parseLine(lines,options);
	};

	Economics.prototype._parseLine = function(lines,options){
		var line = lines.shift();
		if(line == undefined){
			return;
		}
		DEBUG && console.log(line);
		var arr = line.match(/([0-9]+)/);
		DEBUG && console.log(arr);
		var y_m_d = arr[0];
		var year = y_m_d.slice(0,4);
		DEBUG && console.log(y_m_d.slice(0,4));
		if(!fs.existsSync(path.join(this.dest,year))){
			fs.mkdir(path.join(this.dest,year));
		}
		this.insert(path.join(this.dest,year,arr[0] + '.txt'),options.country + ':' +options.filename.slice(0,-4),line.slice(9) + ':' + options.name);

		this._parseLine(lines,options);
	};

	Economics.prototype.exist = function(filename,key){
		if(!fs.existsSync(filename)){
			fs.writeFileSync(filename,'');
		}
		var content = fs.readFileSync(filename);
		if(RegExp(key).test(content)){
			return true;
		}else{
			return false;
		}
	};

	Economics.prototype.insert = function(filename,key,value){
		if(!this.exist(filename,key)){
			fs.appendFileSync(filename, key + ':' + value + '\n');
		}
	};

	Economics.prototype.getDateArray = function(y,m,d){
		//return [yyyymmdd,yyyy,mm,dd]
		var output = [];
		m = m || 0;
		d = d || 0;
		if(String(y).length == 2){
			if(parseInt(y) > 50){
				output[1] = '19' + y;
			}else{
				output[1] = '20' + y;
			}
		}else{
			output[1] = y;
		}
		if(String(m).length == 1){
			output[2]= '0' + m;
		}else{
			output[2]= m;
		}
		if(String(d).length == 1){
			output[3] = '0' + d;
		}else{
			output[3] = d;
		}
		output[0] = '' + output[1] + output[2] + output[3];
		return output;
	};

	return Economics;
})();

/**
 * debug for development
 */

var DEBUG = true;
// if(DEBUG){
// 	var Economics = exports;
// 	var economics = new Economics;
// 	console.log(Economics.a());
// 	console.log(Economics.prototype);
// 	console.log(economics._parseLine.toString());
// 	var filename = 'cn_ben_wai_bi_cun_kuan.xml';
// 	fs.readFile('../../dest/economics/' + filename,{encoding: 'utf8'},function(err,content){
// 		console.log(content);
// 		economics._parse(content,filename);
// 	});

// }

if(DEBUG){
	var Economics = exports;
	var economics = new Economics('../../../dest/phrase-1/economics','../../../database/economics');
	var filenames = fs.readdirSync(path.join(__dirname,economics.src));
	// console.log(filenames);
	// fs.unlinkSync(path.join(__dirname,economics.dest));
	economics.execFile(filenames,function(){
		console.log('finished.');
	});

}


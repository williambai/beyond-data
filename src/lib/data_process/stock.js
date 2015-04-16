/**
 * stock fatch and save into local file
 * 
 */
var fs = require('fs');
var path = require('path');

var Stock = function(src,dest){
	this.src = path.join(__dirname,src);
	if(!fs.existsSync(path.join(__dirname,dest))){
		fs.mkdirSync(path.join(__dirname,dest));
	}
	this.dest = path.join(__dirname,dest);
};

Stock.YAHOO_FINANCE_API_URL = 'http://table.finance.yahoo.com/table.csv?s=code&d=8&e=5&f=2013&g=d&a=11&b=16&c=1991&ignore=.csv';
Stock.CODE_LIST_FILENAME = path.join(__dirname,'./code.txt');

Stock.prototype.saveCode = function(code){
	if(!fs.existsSync(Stock.CODE_LIST_FILENAME)){
		fs.writeFileSync(Stock.CODE_LIST_FILENAME,'');
	}
	var codes = fs.readFileSync(Stock.CODE_LIST_FILENAME,{encoding:'utf8'});
	if(!RegExp(code).test(codes)){
		fs.appendFileSync(file,code + '\n');
	}
};

Stock.prototype.getCodeList = function(){
	var codes = fs.readFileSync(Stock.CODE_LIST_FILENAME).split('\n');
	return codes;
};

Stock.prototype.updateIndex = function(year,month,day,code){
	var filename = path.join(this.dest, year, year + month + day + '.index');
	if(!fs.existsSync(filename)){
		fs.writeFileSync(filename,'');
	}
	var index = fs.readFileSync(filename);
	if(!RegExp(code).test(index)){
		fs.appendFileSync(filename,code + '\n');
	}
};

Stock.prototype.getUrl = function(code,subfix){
	subfix = subfix || '';
	return Stock.YAHOO_FINANCE_API_URL.replace('code',code + subfix);
};


Stock.prototype.exec = function(options,callback){
	options = options || {};
	this.callback = callback;
	fs.readdir(this.src,function(err,files){
		this.execFile(files);
	});
};

Stock.prototype.execFile = function(files){
	var file = files.shift();
	if(file == undefined){
		if(typeof this.callback == 'function') this.callback();
		return;
	}
	fs.read(file,function(err,content){
		this.parse(content);
		this.execFile(files);
	});
};

Stock.prototype.parse = function(content){
	var lines = [];
	this.parseLine(lines);
};

Stock.prototype.parseLine = function(lines){
	var line = lines.shift();
	if(line == undefined){
		return;
	}
	var year = '';
	var month = '';
	var day = '';
	var code = '';
	var fields = this.buildFields(line);
	if(!fs.existsSync(path.join(this.dest,year))){
		fs.mkdir(path.join(this.dest,year));
	}
	if(!fs.existsSync(path.join(this.dest,year,month))){
		fs.mkdir(path.join(this.dest,year,month));
	}
	if(!this.exist(path.join(this.dest,year,month,day),'.txt'),code){
		this.insert(path.join(this.dest,year,month,day,'.txt'),fields);
	}
	this.parseLine(lines);
};

Stock.prototype.buildFields = function(line){
	return line;
};

Stock.prototype.exist = function(file,code){
	var content = fs.readSync(file);
	if(RegExp(code + ';').test(content)){
		return true;
	}else{
		return false;
	}
};

Stock.prototype.insert = function(file,fields){
	fs.writeSync(file,fields);
};

exports = module.exports = Stock;

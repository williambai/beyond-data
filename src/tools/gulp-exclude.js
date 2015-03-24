'use strict';

var through = require('through2');

module.exports = function(startWithout,option){
	var regex = startWithout;
	option = option || {};
	var doExclude = function(file,enc,next){
		if(file.isNull()){
			return next(null,null);
		}

		if(regex.test(String(file.contents))){
			// file.contents = new Buffer(file.path +',' + String(file.contents));		
			return next(null,file);
		}
		next(null,null);
	}

	return through.obj(doExclude);
}
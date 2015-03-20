/*=========================================
=            config                       =
=========================================*/

var config = {
	dest: 'dest',
	stock_sh: require('./src/conf/stock').sh,
	stock_sz: require('./src/conf/stock').sz,
	economics_cn: require('./src/conf/economics').cn,
	economics_us: require('./src/conf/economics').us,
};
var path= require('path');
var gulp = require('gulp');
var seq = require('run-sequence');
var del = require('del');
var download = require("./src/tools/gulp-download");

/*=========================================
=            Clean dest folder            =
=========================================*/

gulp.task('clean_stock',function(done){
	del([
		path.join(config.dest,'stock/**/*')
	],done);
});

gulp.task('clean_all',function(cb) {
	del([
		path.join(config.dest,'**/*')
	],cb);
});

/*=========================================
=            fetch data file              =
=========================================*/

gulp.task('fetch_stock',function(done){
	var files = [];
	for(var i in config.stock_sh){
		files.push({
			url: 'http://cjhq.baidu.com/data/sh/'+ config.stock_sh[i] +'.sh.xml',
			file: config.stock_sh[i] + 'sh.xml',
		});
	}
	for(var i in config.stock_sz){
		files.push({
			url: 'http://cjhq.baidu.com/data/sz/'+ config.stock_sz[i] +'.sz.xml',
			file: config.stock_sz[i] + 'sz.xml',
		});
	}	
	download(files)
		.pipe(gulp.dest(path.join(config.dest,'stock','zh_cn')));
	done();
});

gulp.task('fetch_economics', function(done) {
	var files = [];
	for(var i in config.economics_cn){
		files.push({
			url: config.economics_cn[i].url,
			file: 'cn_' + config.economics_cn[i].filename
		});
	};
	for(var i in config.economics_us){
		files.push({
			url: config.economics_us[i].url,
			file: 'us_' + config.economics_us[i].filename
		});
	};
	download(files)
		.pipe(gulp.dest(path.join(config.dest,'economics')));
	done();
});

/*=========================================
=            build database               =
=========================================*/

gulp.task('build',function(done){
});


/*====================================
=            Default Task            =
====================================*/

gulp.task('default',function(done){
	seq('build',done);
});
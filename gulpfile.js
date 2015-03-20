/*=========================================
=            config                       =
=========================================*/

var config = {
	dest: 'dest',
	stock_sh: require('./src/conf/stock').sh,
	stock_sz: require('./src/conf/stock').sz,
	stock_bk: require('./src/conf/stock').bk,
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
			file: 'sh' + config.stock_sh[i] + '.xml',
		});
	}
	for(var i in config.stock_sz){
		files.push({
			url: 'http://cjhq.baidu.com/data/sz/'+ config.stock_sz[i] +'.sz.xml',
			file: 'sz' + config.stock_sz[i] + '.xml',
		});
	}	
	download(files)
		.pipe(gulp.dest(path.join(config.dest,'stock','zh_cn')));
	done();
});

gulp.task('fetch_stock_bk',function(done){
	var files = [];
	for(var i in config.stock_bk){
		files.push({
			url: 'http://data1.bestgo.com/stockdata/B$'+ config.stock_bk[i] +'/kweek.js',
			file: 'bk' + config.stock_bk[i] + '.js',
		});
	}
	console.log(files);
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

gulp.task('build_mongo',function(done){
	var collections = {};
	var DB_NAME = 'economics';
	var fixtures = require('pow-mongodb-fixtures').connect(DB_NAME);
	//transform data in files into mongodb
	
	//reset and reload MongoDB 
	fixtures.clearAndLoad(
		collections
		,function(err){
			if(err) throw err;
			fixtures.close(function(err){
				if(err) throw err;
				console.log('finished.');
				done && done();
			});
	});

});


/*====================================
=            Default Task            =
====================================*/

gulp.task('default',function(done){
});
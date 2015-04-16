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
var exclude = require('./src/tools/gulp-exclude');
var replace = require('gulp-replace');
var concat = require('gulp-concat');

var download = require("./src/tools/gulp-download");
var mongodb = require('./src/tools/gulp-mongodb');

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
=            build mongo database         =
=========================================*/

gulp.task('build_mongo_stock',function(){
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/economics');
	require('./src/model')();
	var Stock = mongoose.model('Stock');
	Stock.remove(function(){
		mongoose.disconnect();
		gulp.src(path.join(config.dest,'stock','zh_cn','bk*.js'))
			.pipe(exclude(/klinedata=.+[0-9]+/))
			.pipe(replace('var klinedata="',''))
			.pipe(replace('";',''))
			.pipe(mongodb.storeFromFiles(mongoose,'Stock'));
	});
});

gulp.task('export_stock',function(){
	var mongoose = require('mongoose');
	require('./src/model')();
	mongodb.fetchIntoFiles(mongoose,'Stock');	
})
/*=========================================
=            build data for svm           =
=========================================*/

gulp.task('build_data',function(done){
	gulp.src(path.join(config.dest,'stock','zh_cn','bk*.js'))
		.pipe(exclude(/klinedata=.+[0-9]+/))
		.pipe(replace('var klinedata="',''))
		.pipe(replace('";',''))
		.pipe(concat('stock_bk.dat'))
		.pipe(gulp.dest(path.join(config.dest,'svm')));

});

gulp.task('svm',function(){
	var svm = require('node-svm');
	var clf = new svm.SVM();
	svm.read('./dest/svm/train/991020.dat')
		.then(function(dataset){
			return clf.train(dataset);
		})
		.then(function(trainedModel,trainingReport){
			return svm.read('./dest/svm/test/991020.dat');
		})
		.then(function(testset){
			return clf.evaluate(testset);
		})
		.done(function(report){
			console.log(report);
		});
});

/*====================================
=            Default Task            =
====================================*/

gulp.task('default',function(done){
});
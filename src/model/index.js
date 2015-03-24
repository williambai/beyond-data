var mongoose = require('mongoose');

exports = module.exports = function(){
	require('./stock')();
	require('./economics')();
};
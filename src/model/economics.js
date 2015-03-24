var mongoose = require('mongoose');

var Schema = mongoose.Schema;

exports = module.exports = function(){
	var Cpi = new Schema({
		time: Number, // 格式：yyyymm
		type: String,//[全国，城市，农村]
		value: Number
	});
	var EconomicsSchema = new Schema({
		cn: String,
		cpis: [Cpi],
		ppis: Number,
	});
	mongoose.model('Ecomonics', EconomicsSchema);
};
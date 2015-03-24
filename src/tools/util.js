var	getDateString = function(y,m,d){
	var output = '';
	m = m || 0;
	d = d || 0;
	if(String(y).length == 2){
		if(parseInt(y) > 50){
			output += '19' + y;
		}else{
			output += '20' + y;
		}
	}else{
		output += y;
	}
	if(String(m).length == 1){
		output += '0' + m;
	}else{
		output += m;
	}
	if(String(d).length == 1){
		output += '0' + d;
	}else{
		output += d;
	}
	return output;
}

exports = module.exports = {
	getDateString: getDateString,
} 
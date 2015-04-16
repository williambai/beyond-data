var fs = require('fs');
var path = require('path');
var xml2js = require('xml2js');
var _ = require('underscore');

exports = module.exports = (function(){
	var Graph = function(src,dest){
		// DEBUG && console.log('++');
		this.src = src || './';
		this.dest = dest || './';
	};

	Graph.prototype.execFile = function(files,callback){
		var that = this;
		var file = files.shift();
		if(file == undefined){
			callback();
			return;
		}
		fs.readFile(path.join(this.src,file),function(err,content){
			that.parse(content,file);
			//recusion
			that.execFile(files,callback);
		});
	};

	Graph.prototype.parse = function(content,filename){
		var that = this;
		var json = xml2js.parseString(content,function(err,json){
			// console.log(json.chart);
			var x = _.pluck(json.chart.series[0].value,'_');
			var y = json.chart.graphs[0]['graph'];
			// console.log(x);	
			// console.log(y);
			// console.log(y[0]['value'][0]['_']);
			// return;
			var data = [];
			for(var i=0;i<x.length;i++){
				var line = '';
				var y_m_d = [];
				if(/[0-9]+年[0-9]+月/.test(x[i])){
					y_m_d = x[i].match(/([0-9]+)/g);
					line += that.getDateArray(y_m_d[0],y_m_d[1])[0];
				}else if(/[0-9]+\-[0-9]+\-[0-9]+/.test(x[i])){
					y_m_d = x[i].split('-');
					line += that.getDateArray(y_m_d[0],y_m_d[1],y_m_d[2])[0];
				}else if(/[0-9]+年[0-9]+季度/.test(x[i])){
					y_m_d = x[i].match(/([0-9]+)/g);
					y_m_d[1] = 3*y_m_d[1];
					line += that.getDateArray(y_m_d[0],y_m_d[1])[0];
				}else{
					line += x[i];
				}
				for(var j=0;j<y.length;j++){
					line += ';' + y[j]['value'][i]['_']; 
				}
				data.push(line);
			}
			fs.writeFileSync(path.join(__dirname,that.dest,filename),data.join('\n'));
		});
	};
	Graph.prototype.getDateArray = function(y,m,d){
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
	return Graph;
}).call(this);

var Graph = exports;
var graph = new Graph('../../../dest/raw/economics','../../../dest/phrase-1/economics');
var filenames = fs.readdirSync(path.join(__dirname,graph.src));
graph.execFile(filenames,function(){
	console.log('finished.');
});

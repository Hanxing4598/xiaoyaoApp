var express = require('express'); //引入express模块
const bodyParser=require("body-parser");
var app = express();

var router= express.Router();

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', 'PUT,post,GET,DELETE,OPTIONS')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

// 解析application/json数据
var jsonParser = bodyParser.json();
// 解析application/x-www-form-urlencoded数据
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// 实现文件自动导入功能
var currentDirPath = 'server/interface'
var interfaceMap = {};
var fs = require('fs');
fs.readdirSync(currentDirPath).forEach(function(name) {
	var preName = name.split('.')[0]
	interfaceMap[preName] = require('./interface/' + preName + '.js')
});

for (var inter in interfaceMap) {
	for (var funName in interfaceMap[inter]) {
		var fun = interfaceMap[inter][funName]
		var url = '/' + inter + '/' + funName
		app.all(url, urlencodedParser, fun)
	}
}


var server = app.listen(3000, function() {
	console.log('服务启动3000...');
})

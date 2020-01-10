var mysql = require('mysql');
var fs = require('fs');

var pw = fs.readFileSync('./password.p', 'utf8');
pw = pw.slice(0,12);
		
var POOL = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: pw,
	database: "BIOGRAFO"
});

exports.POOL = POOL;
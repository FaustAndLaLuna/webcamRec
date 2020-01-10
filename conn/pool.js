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

if(ISDEV){
	console.log("ISDEV is on, restarting database.");
	POOL.getConnection( function(err, conn){
		if(err)	console.log(err);
		conn.query("DROP TABLE users;", function(err, result){
			if(err)	console.log(err);
		});
	});
	POOL.getConnection( function(err, conn){
		if(err)	console.log(err);
		conn.query("DROP TABLE videos;", function(err, result){
			if(err)	console.log(err);
		});
	});
}

exports.POOL = POOL;
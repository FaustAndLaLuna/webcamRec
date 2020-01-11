var mysql = require('mysql');
var fs = require('fs');

var pw = fs.readFileSync('./password.p', 'utf8');
pw = pw.slice(0,12);
		
var POOL = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: pw,
});

exports.POOL = POOL;

module.exports = async function(){
	console.log("ISDEV is on, restarting database.");
	await new Promise(function(resolve, reject){
		DELETE = "DROP DATABASE IF EXISTS BIOGRAFO;"
		POOL.getConnection(function(error, conn){
			conn.query(DELETE, function(error){
				if(error) console.log(error);
				resolve();
			});
		});
	});
	console.log("Async Await");
	await new Promise(function(resolve, reject){
		const DB = `CREATE DATABASE IF NOT EXISTS BIOGRAFO;`
			const Schema = `CREATE SCHEMA IF NOT EXISTS Biografo;`
		POOL.getConnection(function(error, conn){
			conn.query(DB, function(error, result){
				if(error){
					console.log(error);
					conn.release();
					return reject(error);
				}
				conn.query(Schema, function(error, result){
					if(error){
						console.log(error);
						conn.release();
						return reject(error);
					}
					conn.release();
					return resolve();
				});
			});
		});
	});
}
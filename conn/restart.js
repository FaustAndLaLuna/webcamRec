var POOL = require('./pool').POOL;

module.exports = async function(){
	await new Promise((resolve, reject), function(){
		DELETE = "DROP SCHEMA Biografo;"
		POOL.getConnection(function(error, conn){
			conn.query(DELETE, function(error){
				if(error) console.log(error);
			});
		});
	});
	await new Promise((resolve, reject), function(){
		const DB = `CREATE DATABASE IF NOT EXISTS BIOGRAFO;`
			const Schema = `CREATE SCHEMA IF NOT EXISTS Biografo;`
		POOL.getConnection(function(error, conn){
			conn.query(DB, function(error, conn){
				if(error){
					console.log(error);
					reject(error);
				}
				conn.query(Schema, function(error, conn){
					if(error){
						console.log(error);
						reject(error);
					}
					resolve(true);
				});
			});
		});
	});
}
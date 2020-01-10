var POOL = require('./pool').POOL;

module.exports = async function(){
	await new Promise(function(resolve, reject){
		DELETE = "DROP SCHEMA Biografo;"
		POOL.getConnection(function(error, conn){
			conn.query(DELETE, function(error){
				if(error) console.log(error);
				resolve();
			});
		});
	});
	await new Promise(function(resolve, reject){
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
					resolve();
				});
			});
		});
	});
}
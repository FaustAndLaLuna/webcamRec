var fs = require('fs');
var POOL = require('./pool').POOL;

class videosRepo{
	constructor(){
		
		
		/*
		const sql = `CREATE TABLE IF NOT EXISTS videos(
			id int PRIMARY KEY  AUTO_INCREMENT,
			isEncoded boolean DEFAULT FALSE,
			videoURL varchar(100) DEFAULT NULL,
			timePublished varchar(128),
			tempURL varchar(100) DEFAULT NULL);`
		//console.log(sql);
		conn.query(sql, function(err, result){
			if (err) console.log(err);
			console.log("table created.")});
	*/
		POOL.getConnection(function (error, conn){
			const DB = `CREATE DATABASE IF NOT EXISTS BIOGRAFO;`
			const Schema = `CREATE SCHEMA IF NOT EXISTS Biografo;`
			var sql = `CREATE TABLE IF NOT EXISTS users(
				id int PRIMARY KEY  AUTO_INCREMENT,
				username varchar(128) NOT NULL,
				salt char(32) NOT NULL,
				password varchar(128),
				createdAt datetime DEFAULT NULL);`
			
			conn.query(DB, function(err, result){
				if (err) console.log(err);
				console.log("DATABASE created.");
				conn.query(Schema, function(err, result){
					if(err) console.log(err);
					console.log("Schema created.")
					conn.query(sql, function(err, result){
						if(err)	console.log(err);
						console.log("table created.")
						sql = `CREATE TABLE IF NOT EXISTS videos(
							id int PRIMARY KEY  AUTO_INCREMENT,
							isEncoded boolean DEFAULT FALSE,
							videoURL varchar(100) DEFAULT NULL,
							timePublished varchar(128),
							tempURL varchar(100) DEFAULT NULL);`
						//console.log(sql);
						conn.query(sql, function(err, result){
							if (err) console.log(err);
							console.log("table created.")});
							conn.release();
					});
				});
			});	
		});
	}
	
	updateToEncoded(videoURL, tempURL){
		q = `UPDATE videos 
		 SET videoURL = ?,
		 tempURL = ?,
		 isEncoded = TRUE
		 WHERE tempURL = ? ` ;
		POOL.getConnection(function (err, conn){
			conn.query(q, [videoURL, "COMPLETADO", tempURL], function(err, result){
				if (err)	console.log(err);
				conn.release();
				return;
			});
		});
	}
	
	create(videoURL, timePublished, tempURL){
		q = 'INSERT INTO videos (videoURL, timePublished, tempURL) VALUES ' +
			"(?, ?, ?)";
		POOL.getConnection(function (err, conn){
			conn.query(q, [videoURL, timePublished, tempURL], function(err,result){
				if (err)	console.log(err);
				conn.release();
				return;
			});
		});
	}

	//TODO: Set update, delete, get(one) for sale/sold
	async getAll(){
		POOL.getConnection(function(err, conn){
			conn.query("SELECT * FROM videos;", function(err,result){
				if(err) console.log(err);
				conn.release();
				return result;
			});
		});
	}

	async getNextEncodable(){
		result = await POOL.getConnection(function(err, conn){
			conn.query("SELECT * FROM videos WHERE isEncoded = false limit 1;", function(err, result){
				if(err) console.log(err);
				console.log(result);
			});
		});
		return result;
	}
	
}



module.exports = videosRepo
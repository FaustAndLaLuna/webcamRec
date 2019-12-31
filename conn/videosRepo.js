var mysql = require('mysql');
var fs = require('fs');

class videosRepo{
	constructor(){
		
		var pw = fs.readFileSync('./password.p', 'utf8');
		console.log(pw.slice(0,12));
		pw = pw.slice(0,12);
		var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: pw,
		database: 'biografo'
		});
		console.log(pw);
		conn.connect(function(err){
			if(err) console.log(err);
			console.log("Connected to videos MySQL table!")
		});
		
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
		conn.query(q, [videoURL, "COMPLETADO", tempURL], function(err, result){
			if (err)	console.log(err);
			return;
		});
	}
	
	create(videoURL, timePublished, tempURL){
		q = 'INSERT INTO videos (videoURL, timePublished, tempURL) VALUES ' +
			"(?, ?, ?)";
		conn.query(q, [videoURL, timePublished, tempURL], function(err,result){
			if (err)	console.log(err);
			return;
		});
	}

	//TODO: Set update, delete, get(one) for sale/sold
	getAll(){
		conn.query("SELECT * FROM videos;", function(err,result){
			if(err) console.log(err);
			return result;
		});
	}

	getNextEncodable(){
		conn.query("SELECT * FROM videos WHERE isEncoded = false limit 1;", function(err, result){
			if(err) console.log(err);
			return result;
		});
	}
	
}



module.exports = videosRepo
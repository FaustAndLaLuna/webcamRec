var fs = require('fs');
var POOL = require('./pool').POOL;

class videosRepo{
	constructor(){
		const sql = `CREATE TABLE IF NOT EXISTS videos(
			videoID int PRIMARY KEY  AUTO_INCREMENT,
			userID int DEFAULT 0,
			objectID int DEFAULT 0,
			isEncoded boolean DEFAULT FALSE,
			videoURL varchar(100) DEFAULT NULL,
			timePublished varchar(128),
			tempURL varchar(100) DEFAULT NULL);`
		POOL.getConnection(function (error, conn){
			conn.query(sql, function(err, result){
				if(err)	console.log(err);
				conn.release();
			});
		});
		console.log("BIOGRAFO.videos created");
	}
	
	updateToEncoded(videoURL, tempURL){
		let q = `UPDATE videos 
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
	
	createAssociated(videoURL, timePublished, tempURL, userID, objectID){
		let q = 'INSERT INTO videos (videoURL, timePublished, tempURL, userID, objectID) VALUES ' +
				"(?, ?, ?, ?, ?)"
		POOL.getConnection(function (err, conn){
			conn.query(q, [videoURL, timePublished, tempURL, userID, objectID], function(err,result){
				if (err)	console.log(err);
				conn.release();
				return;
			});
		});
	}
	
	create(videoURL, timePublished, tempURL){
		let q = 'INSERT INTO videos (videoURL, timePublished, tempURL) VALUES ' +
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
	getAll(){
		return new Promise(function (resolve, reject){
			POOL.getConnection(function(err, conn){
				if(err)	reject(err);
				conn.query("SELECT * FROM videos", function(err, result){
					if(err) reject(err);
					return resolve(result);
				});
			});
		});
	}

	getNextEncodable(){
		return new Promise(function (resolve, reject){
			POOL.getConnection(function(err, conn){
				if(err)	reject(err);
				conn.query("SELECT * FROM videos WHERE isEncoded = false limit 1;", function(err, result){
					if(err) reject(err);
					return resolve(result);
				});
			});
		});
	}
	
}



module.exports = videosRepo;
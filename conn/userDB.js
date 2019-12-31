var mysql = require('mysql')

class videosRepo{
	constructor(){
		var pw = fs.readFileSync('../password', 'utf8');
		var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: pw,
		database: 'biografo'
		});
		conn.connect(function(err){
			if(err) console.log(err);
			console.log("Connected to users MySQL table!")
		});
		
		const DB = `CREATE DATABASE IF NOT EXISTS BIOGRAFO;`
		const Schema = `CREATE SCHEMA IF NOT EXISTS Biografo;`
		const sql = `CREATE TABLE IF NOT EXISTS users(
			id int PRIMARY KEY  AUTO_INCREMENT,
			username varchar(128) NOT NULL,
			salt char(32) NOT NULL,
			password varchar(128),
			createdAt datetime DEFAULT NULL);`
		
		conn.query(DB, function(err, result){
			if (err) console.log(err);
			console.log("DATABASE created.");
		}).then(conn.query(Schema, function(err, result){
			if (err) console.log(err);
			console.log("Schema created.");
		})).then(conn.query(sql, function(err, result){
			if (err) console.log(err);
			console.log("table created.")}));
	}

	updateToEncoded(videoURL, tempURL){
		return this.dao.run(
		 `UPDATE videos 
		 SET videoURL = ?,
		 tempURL = ?,
		 isEncoded = 1
		 WHERE tempURL = ? `, [videoURL, "COMPLETADO", tempURL]
		);
	}
	
	async create(videoURL, timePublished, tempURL){
		return this.dao.run('INSERT INTO videos (videoURL, timePublished, tempURL) VALUES ' +
			"(?, ?, ?)", [videoURL, timePublished, tempURL]);
	}

	//TODO: Set update, delete, get(one) for sale/sold
	getAll = async function(){
		return this.dao.all("SELECT * FROM videos;");
	}

	getNextEncodable = async function(){
		return this.dao.get('SELECT * FROM videos WHERE isEncoded = 0');
	}
	
}



module.exports = videosRepo
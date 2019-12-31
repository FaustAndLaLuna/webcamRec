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
			console.log("Connected to videos MySQL table!")
		});
		
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
	}
	
	updateToEncoded(videoURL, tempURL){
		q = `UPDATE videos 
		 SET videoURL = ?,
		 tempURL = ?,
		 isEncoded = TRUE
		 WHERE tempURL = ? ` , [videoURL, "COMPLETADO", tempURL];
		conn.query(q, function(err, result){
			if (err)	console.log(err);
		});
		return;
	}
	
	create(videoURL, timePublished, tempURL){
		q = 'INSERT INTO videos (videoURL, timePublished, tempURL) VALUES ' +
			"(?, ?, ?)", [videoURL, timePublished, tempURL];
		conn.query(q, function(err,result){
			if (err)	console.log(err);
		});
		return;
	}

	//TODO: Set update, delete, get(one) for sale/sold
	getAll(){
		return await conn.query("SELECT * FROM videos;");
	}

	getNextEncodable(){
		return await conn.query("SELECT * FROM videos WHERE isEncoded = false limit 1");
	}
	
}



module.exports = videosRepo
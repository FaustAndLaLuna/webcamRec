class videosRepo{
	constructor(dao){
		this.dao = dao;
		const sql = `CREATE TABLE IF NOT EXISTS videos(
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			isEncoded INTEGER DEFAULT(0),
			videoURL TEXT,
			timePublished TEXT,
			tempURL TEXT)`
		//console.log(sql);
		this.dao.run(sql);
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
	
	create(videoURL, timePublished, tempURL){
		console.log(tempURL);
		return this.dao.run('INSERT INTO videos (videoURL, timePublished, tempURL) VALUES ' +
			"(?, ?, ?)", [videoURL, timePublished, tempURL]);
	}

	//TODO: Set update, delete, get(one) for sale/sold
	getAll(){
		return this.dao.all("SELECT * FROM videos;");
	}

	getNextEncodable(){
		return this.dao.get('SELECT * FROM videos WHERE isEncoded = 0');
	}
	
}



module.exports = videosRepo
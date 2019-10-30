class videosRepo{
	constructor(dao){
		this.dao = dao;
	}

	createTable() {
		//TODO: Add picture, uploader, contact info, what to buy, length?
		const sql = `CREATE TABLE IF NOT EXISTS videos(
			id INTEGER PRIMARY KEY AUTOINCREMENT,	
			videoURL TEXT,
			timePublished TEXT)`
		return this.dao.run(sql);
	}

	create(videoURL, timePublished){
		return this.dao.run('INSERT INTO videos (videoURL, timePublished) VALUES ' +
			"(?, ?)", [videoURL, timePublished]);
	}

	//TODO: Set update, delete, get(one) for sale/sold
	getAll(){
		return this.dao.all("SELECT * FROM videos;");
	}
}

module.exports = videosRepo
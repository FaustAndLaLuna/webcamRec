var fs = require('fs');
var POOL = require('./pool').POOL;

class contactRepo{
	constructor(){
		const sql = `CREATE TABLE IF NOT EXISTS contactMessages(
			messageID int PRIMARY KEY AUTO_INCREMENT,
			message TEXT,
			name TINYTEXT,
			email TINYTEXT);`
				
		POOL.getConnection(function (error, conn){
			conn.query(sql, function(err, result){
				if(err)	console.log(err);
				conn.release();
			});
		});
		console.log("BIOGRAFO.contactMessages created");
	}
	
	create(message, name, email){
		let q = "INSERT INTO questions (message, name, email) VALUES (?, ?, ?);";
		POOL.getConnection(function (err, conn){
				conn.query(q, [message, name, email], function(err, result){
					if (err)	console.log(err);
					conn.release();
					return;
				});
	}
}




module.exports = contactRepo;
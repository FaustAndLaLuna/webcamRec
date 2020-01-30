var fs = require('fs');
var POOL = require('./pool').POOL;

class questionsRepo{
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
		});
	}
	
	getAllFromObject(objectID){
		let q = "SELECT * FROM questions WHERE objectID = ?;";
			return new Promise(function(resolve, reject){
				POOL.getConnection(function (err, conn){
					if(err) reject(err);
					conn.query(q, [objectID], function(err, result){
						if (err)	reject(err);
						conn.release();
						resolve(result);
					});
				});
			});	
		}
	
	getAllQuestionsFromUser(questionUserId){
		let q = "SELECT * FROM questions WHERE userID = ?;";
		return new Promise(function(resolve, reject){
			POOL.getConnection(function (err, conn){
				if(err) reject(err);
				conn.query(q, [questionUserID], function(err, result){
					if (err)	reject(err);
					conn.release();
					resolve(result);
				});
			});
		});	
	}
	
	getAllAnswersFromUser(answerUserId){
	let q = "SELECT * FROM questions WHERE answerUserID = ?;";
		return new Promise(function(resolve, reject){
			POOL.getConnection(function (err, conn){
				if(err) reject(err);
				conn.query(q, [answerUserID], function(err, result){
					if (err)	reject(err);
					conn.release();
					resolve(result);
				});
			});
		});	
	}
}




module.exports = questionsRepo;
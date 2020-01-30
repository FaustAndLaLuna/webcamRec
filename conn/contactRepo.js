var fs = require('fs');
var POOL = require('./pool').POOL;

class questionsRepo{
	constructor(){
		const sql = `CREATE TABLE IF NOT EXISTS questions(
			questionID int PRIMARY KEY AUTO_INCREMENT,
			question TEXT,
			answer TEXT,
			objectID int,
			CONSTRAINT fk_object
			FOREIGN KEY (objectID)
			REFERENCES objects(objectID)
				ON UPDATE CASCADE
				ON DELETE CASCADE);`
				
		POOL.getConnection(function (error, conn){
			conn.query(sql, function(err, result){
				if(err)	console.log(err);
				conn.release();
			});
		});
		console.log("BIOGRAFO.questions created");
	}
	
	create(question, objectID){
		let q = "INSERT INTO questions (question, objectID) VALUES ( ?, ?);";
		POOL.getConnection(function (err, conn){
			conn.query(q, [question, objectID], function(err, result){
				if (err)	console.log(err);
				conn.release();
				return;
			});
		});
	}
	
	answer(questionID, answer){
		let q = "UPDATE questions SET answer = ? WHERE questionID = ?;"
		POOL.getConnection(function(err, conn){
			conn.query(q, [answer, questionID], function(err, result){
				if(err) console.log(err);
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
	
/* 	getAllQuestionsFromUser(questionUserId){
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
	} */
}




module.exports = questionsRepo;
var fs = require('fs');
var POOL = require('./pool').POOL;

class questionsRepo{
	constructor(){
		const sql = `CREATE TABLE IF NOT EXISTS questions(
			questionID int PRIMARY KEY  AUTO_INCREMENT,
			question text NOT NULL,
			objectID int NOT NULL,
			userID int NOT NULL,
			createdAt datetime NOT NULL,
			answer text DEFAULT NULL,
			answerUserID int NOT NULL,
			CONSTRAINT fk_user
			FOREIGN KEY (userID)
			REFERENCES users(id)
				ON UPDATE CASCADE
				ON DELETE CASCADE,
			FOREIGN KEY (answerUserID)
			REFERENCES users(id)
				ON UPDATE CASCADE
				ON DELETE CASCADE,
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
	
	answer(answer, answerUserID, objectID){
		let q = "UPDATE questions SET answer = ?, answerUserID = ? WHERE questionID = ?;";
		POOL.getConnection(function (err, conn){
				conn.query(q, [answer, answerUserID, questionID], function(err, result){
					if (err)	console.log(err);
					conn.release();
					return;
				});
		}
	}
	
	create(question, userID, objectID){
		let q = "INSERT INTO questions (question, objectID, userID, createdAt) VALUES (?, ?, ?, NOW());";
		POOL.getConnection(function (err, conn){
				conn.query(q, [question, objectID, userID], function(err, result){
					if (err)	console.log(err);
					conn.release();
					return;
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




module.exports = objectsRepo;
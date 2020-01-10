var POOL = require('./pool').POOL;
var crypto = require('crypto');

const SALT_LEN = 32;
class userDB{
	constructor(){
		POOL.getConnection(function(error, conn){
			let sql = `CREATE TABLE IF NOT EXISTS users(
				userID int PRIMARY KEY  AUTO_INCREMENT,
				username varchar(128) NOT NULL UNIQUE,
				salt char(32) NOT NULL,
				password varchar(128),
				createdAt datetime DEFAULT NULL,
				isAdmin boolean DEFAULT FALSE);`
			
			conn.query(sql, function(error, result){
				if (error) console.log(error);
				return;
			});
		});
	}
	
	genSalt(length){
		return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
	}
	
	sha1(password, salt){
		
		var hash = crypto.createHmac('sha1', salt);
		hash.update(password);
		var value = hash.digest('hex');
		return value;
	}
	
	getUserID(username){
		let q = "SELECT * FROM users WHERE username = '?';"
		return new Promise(function (resolve, reject){
			POOL.getConnection(function(err, conn){
				if(err)	reject(err);
				conn.query(q, username, function(err, result){
					if(err)	reject(err);
					if(result.length == 0){
						resolve(-1);
					}
					resolve(result[0]);
				});
			});
		});
	}
	
	validate(username, password){
		let q = "SELECT * FROM users WHERE username = '?';"
		return new Promise(function (resolve, reject){
			POOL.getConnection(function(err, conn){
				if(err)	reject(err);
				conn.query(q, username, function(err, result){
					if(err)	reject(err);
					if(result.length == 0){
						resolve(false);
					}
					else if(result[0].password != sha1(password, result[0].salt)){
						resolve(false)
					}
					resolve(result[0]);
				});
			});
		});
	}
	
	usernameExists(username){
	let q = "SELECT * FROM users WHERE username = '?';"
		return new Promise(function (resolve, reject){
			POOL.getConnection(function(err, conn){
				if(err)	reject(err);
				conn.query(q, username, function(err, result){
					if(err)	reject(err);
					if(result.length == 0){
						resolve(false);
					}
					resolve(true);
				});
			});
		});
	}
	
	createNew(username, password, createdAt, isAdmin){
		salt = genSalt(SALT_LEN);
		password = sha1(password, salt);
		
		let q = 'INSERT INTO users (username, salt, password, createdAt, isAdmin) VALUES ' +
				"(?, ?, ?, ?, ?)"
		POOL.getConnection(function (err, conn){
			conn.query(q, [username, salt, password, createdAt, isAdmin], function(err,result){
				if (err)	console.log(err);
				conn.release();
				return;
			});
		});
		return {username: username, password: password, salt: salt, createdAt, createdAt, isAdmin, isAdmin}
	}
	
}



module.exports = userDB;
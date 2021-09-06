var POOL = require('./pool').POOL;
var crypto = require('crypto');

const SALT_LEN = 32;
class userDB{
	constructor(){
		POOL.getConnection(function(error, conn){
			let sql = `CREATE TABLE IF NOT EXISTS users(
				id int PRIMARY KEY  AUTO_INCREMENT,
				username varchar(128) NOT NULL UNIQUE,
				salt char(32) NOT NULL,
				password varchar(128),
				createdAt datetime DEFAULT NULL,
				isAdmin boolean DEFAULT FALSE);`
			
			conn.query(sql, function(error, result){
				if (error) console.log(error);
				console.log('BIOGRAFO.users created');
				conn.release();
				return;
			});
		});
		console.log("users Table Configured!");
	}
	
	getUserByID(id){
		let q = "SELECT * FROM users WHERE id = '?';"
		return new Promise(function (resolve, reject){
			POOL.getConnection(function(err, conn){
				if(err)	reject(err);
				conn.query(q, id, function(err, result){
					if(err)	reject(err);
					if(result.length == 0){
						conn.release();
						return resolve(false);
					}
					conn.release();
					return resolve(result[0]);
				});
			});
		});
	}

	getAllUsers(){
		let q = "SELECT * FROM users;"
		return new Promise(function(resolve, reject){
			POOL.getConnection(function(err, conn){
				if(err) reject(err);
				conn.query(q, function(err, result){
					if(err) reject(err);
					if(result.length == 0){
						conn.release();
						return resolve(false);
					}
					conn.release();
					return(resolve(result));
				})
			});
		});
	}
	
	validate(username, password){
		let q = "SELECT * FROM users WHERE username = ?;"
		return new Promise(function (resolve, reject){
			POOL.getConnection(function(err, conn){
				if(err)	reject(err);
				conn.query(q, username, function(err, result){
					if(err)	reject(err);
					if(result.length == 0){
						conn.release();
						return resolve(false);
					}
					else if(result[0].password != sha1(password, result[0].salt)){
						conn.release();
						return resolve(false)
					}
					conn.release();
					return resolve(result[0]);
				});
			});
		});
	}
	
	usernameExists(username){
	let q = "SELECT * FROM users WHERE username = ?;";
		return new Promise(function (resolve, reject){
			POOL.getConnection(function(err, conn){
				if(err)	reject(err);
				conn.query(q, username, function(err, result){
					if(err)	reject(err);
					console.log("result: " + result);
					if(typeof result === "undefined" || result.length == 0){
						conn.release();
						return resolve(false);
					}
					conn.release();
					return resolve(true);
				});
			});
		});
	}

	getID(username){
		let q = "SELECT id FROM users WHERE username = ?;";
		return new Promise(function (resolve, reject){
			POOL.getConnection(function(err, conn){
				if(err) reject(err);
				conn.query(q, username, function(err, result){
					if (err) reject (err);
					conn.release();
					resolve(result[0].id);
				});
			});
			return;
		});
	}

	
	createNew(username, password, isAdmin){
		let salt = genSalt(SALT_LEN);
		password = sha1(password, salt);
		
		let q = 'INSERT INTO users (username, salt, password, createdAt, isAdmin) VALUES ' +
				"(?, ?, ?, NOW(), ?)"
		return new Promise(function (resolve, reject){
			POOL.getConnection(function (err, conn){
				conn.query(q, [username, salt, password, isAdmin], function(err,result){
					if (err)	console.log(err);
					conn.query("SELECT * FROM users WHERE username = ?", [username], function(err, result){
						if (err) console.log(err);
						conn.release();
						return resolve(result[0]);
					});
				});
			});	
		});
		
	}
	
}
function sha1(password, salt){
		var hash = crypto.createHmac('sha1', salt);
		hash.update(password);
		var value = hash.digest('hex');
		return value;
}
	
function genSalt(length){
		return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
}

module.exports = userDB;
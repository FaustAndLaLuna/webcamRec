var fs = require('fs');
var POOL = require('./pool').POOL;

class objectsRepo{
	constructor(){
		const sql = `CREATE TABLE IF NOT EXISTS objects(
			objectID int PRIMARY KEY  AUTO_INCREMENT,
			title varchar(255) NOT NULL,
			offeringUserID int NOT NULL,
			soldUserID int DEFAULT -1,
			soldVideoID int DEFAULT -1,
			isAuction boolean DEFAULT FALSE,
			description text DEFAULT NULL,
			history text DEFAULT NULL,
			endDate datetime NOT NULL,
			createdAt datetime NOT NULL,
			images varchar(1000),
			CONSTRAINT fk_user
			FOREIGN KEY (offeringUserID)
			REFERENCES users(id)
				ON UPDATE CASCADE
				ON DELETE CASCADE,
			FOREIGN KEY (soldUserID)
			REFERENCES users(id)
				ON UPDATE CASCADE
				ON DELETE CASCADE);`
				
		POOL.getConnection(function (error, conn){
			conn.query(sql, function(err, result){
				if(err)	console.log(err);
				conn.release();
			});
		});
		console.log("BIOGRAFO.objects created");
	}
	
	getAllFromSeller(userID){
		let q = "SELECT * FROM objects WHERE offeringUserID = ?;";
		return new Promise(function(resolve, reject){
			POOL.getConnection(function (err, conn){
				if(err) reject(err);
				conn.query(q, [userID], function(err, result){
					if (err)	reject(err);
					conn.release();
					resolve(result);
				});
			});
		});	
	}
	
	getAllFromBuyer(userID){
		let q = "SELECT * FROM objects WHERE soldUserID = ?;";
		return new Promise(function(resolve, reject){
			POOL.getConnection(function (err, conn){
				if(err) reject(err);
				conn.query(q, [userID], function(err, result){
					if (err)	reject(err);
					conn.release();
					resolve(result);
				});
			});
		});	
	}
	
	getObject(objectID){
		let q = "SELECT * FROM objects WHERE objectID = ? LIMIT 1;";
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
	
	
	sell(objectID, userID){
		let q = "UPDATE objects SET soldUserID = ? WHERE objectID = ?;";
		POOL.getConnection(function (err, conn){
				conn.query(q, [userID, objectID], function(err, result){
					if (err)	console.log(err);
					conn.release();
					return;
				});
		});
	}
	
	getAllUnsold(){
		return new Promise(function (resolve, reject){
			POOL.getConnection(function(err, conn){
				if(err)	reject(err);
				conn.query("SELECT * FROM objects WHERE soldUserId = -1;", function(err, result){
					if(err) reject(err);
					conn.release();
					return resolve(result);
				});
			});
		});
	}

	//TODO: Set update, delete, get(one) for sale/sold
	getAll(){
		return new Promise(function (resolve, reject){
			POOL.getConnection(function(err, conn){
				if(err)	reject(err);
				conn.query("SELECT * FROM objects;", function(err, result){
					if(err) reject(err);
					conn.release();
					return resolve(result);
				});
			});
		});
	}

	getRandomLimitedUnsold(limit){
		return new Promise(function (resolve, reject){
			POOL.getConnection(function(err, conn){
				if(err)	reject(err);
				conn.query("SELECT * FROM objects WHERE soldUserId = -1 ORDER BY RAND() LIMIT ?;", [limit], function(err, result){
					if(err) reject(err);
					conn.release();
					return resolve(result);
				});
			});
		});
	}
	
	getRandomLimited(limit){
		return new Promise(function (resolve, reject){
			POOL.getConnection(function(err, conn){
				if(err)	reject(err);
				conn.query("SELECT * FROM objects ORDER BY RAND() LIMIT ?;", [limit], function(err, result){
					if(err) reject(err);
					conn.release();
					return resolve(result);
				});
			});
	}
	
	create(title, userID, isAuction, description, history, endDate, images){
		let sql = "INSERT INTO objects (title, offeringUserId, isAuction, description, history, endDate, createdAt, images) VALUES (?,?,?,?,?,?,NOW(),?);";
		POOL.getConnection(function(err, conn){
			conn.query(q, [title, userID, isAuction, description, history, endDate, images] function(err, result){
				conn.release();
				return;
			});
			
		});
	}
}



module.exports = objectsRepo;
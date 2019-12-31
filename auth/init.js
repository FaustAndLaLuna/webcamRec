const passport = require('passport');
const crypto = require('crypto');
const SALT_LEN = 32;
var mysql = require('mysql');
var fs = require('fs');

var pw = fs.readFileSync('../password', 'utf8');

var conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: pw,
	database: 'biografo'
})

function gensalt(length){
	return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
}

function sha1(password, salt){
	var hash = crypto.createHmac('sha1', salt);
	hash.update(password);
	var value = hash.digest('hex');
	return {salt:salt, passwordHash: value};
}



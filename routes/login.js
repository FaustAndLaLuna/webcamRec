const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
var userDB = require('../conn/userDB');

passport.use(new localStrategy(function(username, password, done){
	userDB.validate.then(function(result){
		return done(null, result);
	});
}));
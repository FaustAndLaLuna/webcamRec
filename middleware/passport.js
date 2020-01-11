var LocalStrategy = require('passport-local').Strategy;
userDatabase = require('../conn/userDB');
var userDB = new userDatabase();

module.exports = function(passport){
	console.log("Configuring passport:");
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});
	passport.deserializeUser(function(id, done){
		userDB.getUserByID(id).then(function(result){
			console.log("Deserializing id " + id);
			console.log(result);
			done(null, result);
		});
	});
	
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, username, password, done){
		console.log("Signup Check! Username: "+ username);
		userDB.usernameExists(username).then(function(result){
			if(result){
				console.log("UserName Exists Error");
				return done(null, false, req.flash('signupMessage', 'Ese mail está ocupado.'));
			}
			else{
				user = userDB.createNew(username, password, false).then(function(user){
					req.logIn(user);
					console.log(user);
					return done(null, user);
				});
			}
		});
	}));
	
	passport.use('local-login', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
		}, function(req, username, password, done){
			console.log("Login Check! Username: "+ username);
			userDB.validate(username, password).then(function(result){
				if(result){
					console.log("User Logged In.");
					req.logIn(result);
					return done(null, result);
				}
				else{
					console.log("User NOT logged in, error.");
					return done(null, false, req.flash('loginMessage', "No se encontró el usuario o la contraseña es incorrecta."));
				}
			});
		}));
}

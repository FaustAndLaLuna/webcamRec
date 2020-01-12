var LocalStrategy = require('passport-local').Strategy;
userDatabase = require('../conn/userDB');
var userDB = new userDatabase();

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});
	passport.deserializeUser(function(id, done){
		userDB.getUserByID(id).then(function(result){
			done(null, result);
		});
	});
	
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, username, password, done){
		userDB.usernameExists(username).then(function(result){
			if(result){
				return done(null, false, req.flash('signupMessage', 'Ese mail está ocupado.'));
			}
			else{
				user = userDB.createNew(username, password, false).then(function(user){
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
			userDB.validate(username, password).then(function(result){
				if(result){
					return done(null, result);
				}
				else{
					return done(null, false, req.flash('loginMessage', "No se encontró el usuario o la contraseña es incorrecta."));
				}
			});
		}));
}

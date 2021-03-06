const Q = require('q');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const constant = require('../lib/constant');
const dbContext = require('../lib/dbContext');
const userService = require('./userService');

// Authenticate Service
// https://scotch.io/tutorials/easy-node-authentication-setup-and-local
// https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v1-nodejs-webapi
const auth = {};

auth.setup = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    if(!constant.AZURE_AUTHENTICATION) {
        const authenticationLocal = new LocalStrategy(
            function (username, password, done) {
                var data = {
                    success: userService.authenticate(username, password),
                    user: { username: username, password: password }
                };
                return done(null, data);
            }
        );

        passport.use(authenticationLocal);
    }
};

auth.getInformationSchema = function(){
    let deferred  = Q.defer();
    let tables;

    Q.when()    
    .then(function(){
		let sql = 'SELECT * FROM INFORMATION_SCHEMA.TABLES';
        return dbContext.queryList(sql)
		.then(function(data){
			tables = data;
        });
    })
    .then(function(){
        deferred.resolve(tables);
    })
    .catch(function(err){        
        deferred.reject(err);
    });

    return deferred.promise;
};

module.exports = auth;

var env 		= process.env.NODE_ENV
    config      = require('../config');							// get our config file;

var async 		= require('async'),								// Let functions be called in parallel
	moment 		= require('moment'), 							// https://www.npmjs.com/package/moment (mysql was having trouble converting js Date to DateTime)
	mongodb 	= require('mongoose'),							// https://www.npmjs.com/package/mongoose
	mysql 		= require('mysql'), 							// https://www.npmjs.com/package/mysql
	request 	= require('request'),							// https://www.npmjs.com/package/request
	underscore  = require('underscore'),						// http://underscorejs.org/

	User   		= require('../models/users'); 					// get our mongoose model
	databases 	= config.databases[env];


/**
 * LOGR
 *
 * @param log				{function}		Required debug library
 * @param msg				{array}			Array of messages logged so far
 * @param message_array		{string|array}	String or an Array of Strings of messages to be logged
 * @returns 				{array}			['messages',...,msg]
 */
function _logr(log, messages, msg){
	if ( Array.isArray(msg) ) {
		for (var m in msg) { log(msg[m]); messages.push(msg[m]); }
	} else { log(msg); messages.push(msg); }
	return messages;
}

/**
 * ERROR OUT
 *
 * @param  {function}   log      Required debug library
 * @param  {array}   	messages Array of messages logged so far
 * @param  {function} 	cb       callback function
 * @param  {boolean} 	exit     whether or not to exit out or just log as an error
 * @param  {string}   	msg      Exit message
 * @param  {string}   	err      Specific error message if desired (Optional)
 * @return {JSON}   	         {status: 'error', error: 'Description of issue', messages: ['messages', ...]}
 */
function error_out(log, messages, cb, exit, msg, err) {
	err = err ? err : msg;
	_logr(log, messages, msg);
	if (exit) {
		return cb({'status':'error','error':err,'messages':messages});
	}
}

module.exports = (function(){
	var _self = this;

	/**
	 * Checks MongoDB to see if user already registered with that userID
	 * @param  {string}   	userID 	Alphanumeric String between 4-20 characters for userID
	 * @param  {Function} 	cb     	Express response callback
	 */
	_self.checkUserID = function(userID, cb) {

		/* ----------------- SET UP ----------------- */
		//Set Up logging 
		var log = require('debug')('goneGamer:auth:checkUserID'), debug_name = 'checkUserID', messages = [];
		var logr = function(message) {
			_logr(log, messages, message);
		}

		logr('/lib/auth.js -> '+debug_name+' accessed. Checking: '+userID);

		User.findOne({userID: userID}, function(err, user){
			if (err) error_out(log, messages, cb, 1, 'There was an error checking the database', err);
			logr( 'Query successful. '+userID+' is '+(!user ? 'available': 'unavailable') );

			return cb({user_exists: !!user, log: messages});
			
		});
	}

	/**
	 * Register a new User
	 * @param  {JSON}   	user 	{playerName, userID, password, password2, email}
	 * @param  {Function} 	cb   	Express response callback
	 */
	_self.registerUser = function(user, cb) {

		/* ----------------- SET UP ----------------- */
		//Set Up logging 
		var log = require('debug')('goneGamer:auth:registerUser'), debug_name = 'registerUser', messages = [];
		var logr = function(message) {_logr(log, messages, message); }

		logr('/lib/auth.js -> '+debug_name+' accessed. Creating '+user.userID);

		// Use Mongoose Schema to build new user
		var newUser = new User(user);

		// save the sample user
		newUser.save(function(err, data) {
			if (err) error_out(log, messages, cb, 1, 'There was an error saving the new user', err);
			logr('User saved successfully!');

			return cb({status: 'ok', log: messages, data: data});
		});
	}

	/**
	 * login check
	 * @param  {Object}   user {username, password} - password is unsalted
	 * @param  {Function} cb   Express response callback
	 */
	_self.login = function(user, cb) {

		/* ----------------- SET UP ----------------- */
		//Set Up logging 
		var log = require('debug')('goneGamer:auth:login'), debug_name = 'login', messages = [];
		var logr = function(message) {_logr(log, messages, message); }

		logr('/lib/auth.js -> '+debug_name+' accessed by '+user.userID);

		// var testUser = new User(user);

		// Check the user details against the database
		// Additional Info will either be the number of attempts remaining or when the account will be unlocked
		User.getAuthenticated(user.userID, user.password, function(err, user, err_code, addl_info) {
			if (err) 				return cb({status: 'error', err: err});
			if (err_code != null) 	return cb({status: 'error', err_no: err_code, addl_info: addl_info});

			return cb({status: 'ok', message: 'User authenticated.', data: user});

		});

	}

	return _self;
	
})();
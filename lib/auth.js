
var env 		= process.env.NODE_ENV
    config      = require('../config');							// get our config file;

var request 	= require('request'),							// https://www.npmjs.com/package/request
	underscore  = require('underscore'),						// http://underscorejs.org/
	mysql 		= require('mysql'), 							// https://www.npmjs.com/package/mysql
	moment 		= require('moment'), 							// https://www.npmjs.com/package/moment (mysql was having trouble converting js Date to DateTime)
	databases 	= config.databases[env];


/**
 * LOGR
 *
 * @param log				{function}		Required debug library
 * @param msg				{array}			Array of messages logged so far
 * @param message_array		{string|array}	String or an Array of Strings of messages to be logged
 * @returns 				{array}			['messages',...,msg]
 */
function logr(log, messages, msg){
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
	logr(log, messages, msg);
	if (exit) {
		return cb({'status':'error','error':err,'messages':messages});
	}
}

module.exports = (function(){
	var self = this;
	
})();
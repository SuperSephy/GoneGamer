// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
	userid: 	{ type: String, required: true, trim: true},
    playerName: { type: String, required: true, trim: true }, 
    password: 	{ type: String, required: true }, 
    email: 		{ type: String, required: true },

    last_login: Date,
    inactive: 	Boolean,

    admin: 		Boolean 
}, {
	timestamps: true
}));
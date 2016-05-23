// get an instance of mongoose and mongoose.Schema
var mongoose 			= require('mongoose'),								// Mongo ORM
    log 				= require('debug')('goneGamer:model:templates');	// Log to console with details

var Schema 				= mongoose.Schema;

// set up a mongoose model (passed in module.exports)
var UserSchema 			= new Schema({ 
	name: 			{ type: String, 	required: true, trim: true, index: { unique: true } },
    
    fields: 		{}														// Mixed
}, {
	timestamps: true
});
// get an instance of mongoose and mongoose.Schema
var mongoose 	= require('mongoose'),
    log         = require('debug')('goneGamer:model:users'),
	bcrypt 		= require('bcrypt'),
    SALT 		= 10;					// How many times password is salted

var Schema 		= mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var UserSchema 	= new Schema({ 
	userID: 	{ type: String, required: true, trim: true, index: { unique: true } },
    playerName: { type: String, required: true, trim: true }, 
    password: 	{ type: String, required: true }, 
    email: 		{ type: String, required: true },

    last_login: Date,
    inactive: 	Boolean,

    admin: 		Boolean 
}, {
	timestamps: true
});


// Ensure Passwords are salted before saving
UserSchema.pre('save', function(next) {
    var user = this;

    log(['Saving user: ', user]);

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

// Compare submitted password to saved password
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Sample usage of comparing password
// User.findOne({ username: 'jmar777' }, function(err, user) {
//     if (err) throw err;

//     // test a matching password
//     user.comparePassword('Password123', function(err, isMatch) {
//         if (err) throw err;
//         console.log('Password123:', isMatch); // -> Password123: true
//     });

//     // test a failing password
//     user.comparePassword('123Password', function(err, isMatch) {
//         if (err) throw err;
//         console.log('123Password:', isMatch); // -> 123Password: false
//     });
// });

module.exports = mongoose.model('User', UserSchema);
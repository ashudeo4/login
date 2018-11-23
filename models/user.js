const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// mongoose.model('ideas', IdeaSchema);
var User = mongoose.model('User', UserSchema);

module.exports = User;
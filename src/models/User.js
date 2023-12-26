const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true

    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = User = mongoose.model("User", userSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    accolades : {
        type: Array,
        default: []
    },
    age: {
        type: Number,
        required: true
    },
    dob: {
        type: Date
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    },
    dateJoined: {
        type: Date,
        default: Date.now
    },
    followings: {
        type: Array,
        default: []
    },
    followers: {
        type: Array,
        default: []
    },
    roomsCreated: {
        type: Number,
        default: 0
    }
})

module.exports = User = mongoose.model('user', userSchema);
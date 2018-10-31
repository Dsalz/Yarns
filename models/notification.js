const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const notificationSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    userId : {
        type: String,
        required: true
    },
    userName : {
        type: String,
        required: true
    },
    isRead:{
        type: Boolean,
        default: false
    },
    timeCreated: {
        type: Date,
        default: Date.now
    }
})

module.exports = notification = mongoose.model('notification', notificationSchema);
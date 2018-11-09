const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const notificationSchema = new Schema({
    type : {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    recipientId : {
        type: String,
        required: true
    },
    creatoruserName : {
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
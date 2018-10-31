const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    imageUrl : {
        type: String,
        required: false
    },
    roomId:{
        type: String,
        required: true
    },
    roomName:{
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
    isActive:{
        type: Boolean,
        default: true
    },
    timeCreated: {
        type: Date,
        default: Date.now
    },
    replies: {
        type: Number,
        default: 0
    },
    isReply: {
        type: Boolean,
        default: true
    },
    origComment: {
        type: String,
        required: true
    }

})

module.exports = comment = mongoose.model('comment', commentSchema);
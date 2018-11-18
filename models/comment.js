const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
    message: {
        type: String,
        required: true
    },

    authorName: {
        type: String,
        required: true
    },

    authorId: {
        type:String,
        required: true
    },

    timeCreated: {
        type: Date,
        default: Date.now
    }
})

const commentSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    imageUrl : {
        type: String,
        required: false
    },
    imageName : {
        type: String,
        required: false
    },
    accolades : {
        type: Number,
        default: 0
    },
    roomName:{
        type: String,
        required: true
    },
    authorId : {
        type: String,
        required: true
    },
    authorName : {
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    },
    timeCreated: {
        type: Date,
        default: new Date()
    },
    replies: [ ReplySchema ]
})

module.exports = comment = mongoose.model('comment', commentSchema);
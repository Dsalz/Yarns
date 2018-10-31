const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const roomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    houseId: {
        type: String,
        required: true
    },
    houseName: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    creatorName: {
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    commentNo: {
       type: Number,
       default: 0 
    }
})

module.exports = Room = mongoose.model('room', roomSchema);
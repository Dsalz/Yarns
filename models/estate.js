const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const estateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    }
})

module.exports = Estate = mongoose.model('estate', estateSchema);
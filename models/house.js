const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const houseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    estateId : {
        type: String,
        required: true
    },
    estateName : {
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    }
})

module.exports = House = mongoose.model('house', houseSchema);
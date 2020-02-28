const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

const RemarkSchema = new Schema({
    userId : {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required:true,
        default: "none"
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    heard: {
        type: Number,
        required: true,
        default: 0
    }
},
{versionKey: false})


module.exports = mongoose.model('remark', RemarkSchema);
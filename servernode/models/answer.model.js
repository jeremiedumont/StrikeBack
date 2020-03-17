const mongoose = require('mongoose');

const Schema = mongoose.Schema

const AnswerSchema = new Schema({
    remarkId : {
        type: String,
        required: true
    },
    userId : {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    ups: {
        type: Number,
        required: true,
        default: 0
    },
    downs: {
        type: Number,
        required: true,
        default: 0
    },
    pertinency: {
        type: Number,
        default: 0
    }
},
{versionKey: false})


module.exports = mongoose.model('answers', AnswerSchema);
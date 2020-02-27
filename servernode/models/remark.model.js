const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

const Content = new Schema({
    title: {
        type: String,
        required: true
    },
    text: String,
    image: {
        type: String,
        default: "none"
    },
},
{ _id : false }
)

const RemarkSchema = new Schema({
    userId : {
        type: String,
        required: true
    },
    content : {
        type: Content,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    heared: {
        type: Number,
        required: true,
        default: 0
    }
},
{versionKey: false})


module.exports = mongoose.model('remark', RemarkSchema);
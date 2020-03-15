const mongoose = require('mongoose');

const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    postId : {
        type: String,
        required: true
    },
    userId : {
        type: String,
        required: true
    },
    numberNotifs: {
        type: Number,
        default: 0
    } 
},
{versionKey: false})


module.exports = mongoose.model('notifications', NotificationSchema);
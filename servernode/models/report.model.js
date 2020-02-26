const mongoose = require('mongoose')

const Schema = mongoose.Schema
//Users ( _id, pseudo, color, email, password, admin, creationDate, favorites: [remarkId] ) 
const reportSchema = new Schema({
    postId : {
        type : String,
        required : true
    },
    type : {
        type : String,
        enum: ['Remark', 'Answer',],
        required : true
    },
    numberReportings : {
        type : Number,
        required : true,
        default : 1
    },
    alreadyChecked : {
        type : Boolean,
        default : false,
        required : true
    }


},{versionKey:false});

const Report = mongoose.model('reports', reportSchema);

module.exports = Report;
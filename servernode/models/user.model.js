const mongoose = require('mongoose')

const Schema = mongoose.Schema
//Users ( _id, pseudo, color, email, password, admin, creationDate, favorites: [remarkId] ) 
const userSchema = new Schema({
    pseudo : {
        type : String,
        required : true, 
        unique : true,
        minlength : 3
    },
    email : {
        type : String,
        required : true, 
        unique : true,
        minlength : 3
    },
    admin : {
        type : Boolean,
        default : false,
        required : true
    },
    creationDate : {
        type : Date,
        default : Date.now(),
        required : true
    },
    color : {
        type : String,
        default : "#ffffff",
        required : true
    },
    password : {
        type : String,
        minlength : 6,
        required : true
    },
    ups : {
        type : Array,
        default: [],
        required : false
    },
    downs : {
        type : Array,
        default: [],
        required : false
    },
    heards : {
        type : Array,
        default: [],
        required : false
    },
    reports : {
        type : Array,
        default: [],
        required : false
    }

},{versionKey:false});

const User = mongoose.model('users', userSchema);

module.exports = User;
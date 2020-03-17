const mongoose = require('mongoose')

const Schema = mongoose.Schema
const authTokenSchema = new Schema({
    userId : {
        type : String,
        required : true
    },
    creationDate : {
        type: Date,
        default: Date.now()
    }
},{versionKey:false});

const AuthToken = mongoose.model('authtokens', authTokenSchema);

module.exports = AuthToken;
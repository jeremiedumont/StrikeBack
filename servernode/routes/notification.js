const express = require('express');
const router = express.Router();
const Notification = require('../models/notification.model');
const AuthToken = require('../models/authToken.model');

router.get('/findByUserId', (req,res,next) => {
    AuthToken.findById(req.query.token)
    .then((token) => {
        Notification.find({ 
            userId: token.userId
        })
        .then((notifs) => res.status(200).json(notifs))
        .catch(err => res.status(400).json('Error:' + err))
    })
    .catch(err => {
        res.status(401).json('Authentication Error: ' + err)
    })
});

router.delete('/delete', (req,res,next) => {
    AuthToken.findById(req.query.token )
    .then(() => {       
        Notification.findOneAndDelete({ 
            _id: req.query.id 
        })
        .then((answer) => res.status(200).json("Notification deleted."))
        .catch(err => res.status(400).json('Error:' + err))
    })
    .catch(err => {
        res.status(401).json('Authentication Error: ' + err)
    })

});

module.exports = router;
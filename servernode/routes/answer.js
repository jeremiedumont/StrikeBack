const express = require('express');
const router = express.Router();
const Answer = require('../models/answer.model')
const User = require('../models/user.model')
const Remark = require('../models/remark.model')
const Notification = require('../models/notification.model')
let AuthToken = require('../models/authToken.model');

////GET REQUESTS

//http://localhost:5000/answers/?id=5e500b489febd9351c7bdac1
router.get('/', (req, res, next) => {
    Answer.findOne({
        _id: req.query.id
    })
        .then((answer) => res.status(200).json(answer))
        .catch(err => res.status(400).json('Error:' + err))
});

//
router.get('/findByRemark', (req, res, next) => {
    Answer.find({
        remarkId: req.query.id
    })
        .then((answers) => res.status(200).json(answers))
        .catch(err => res.status(400).json('Error:' + err))
});

//http://localhost:5000/answers/findByUserId?id=5e500b859febd9351c7bdac2
router.get('/findByUserId', (req, res, next) => {
    AuthToken.findById(req.query.token)
        .then((token) => {
            Answer.find({
                userId: token.userId
            })
                .then((answers) => res.status(200).json(answers))
                .catch(err => res.status(400).json('Error:' + err))
        })
        .catch(err => {
            res.status(401).json('Authentication Error: ' + err)
        })
});

//http://localhost:5000/answers/sorted/date?order=1&skip=0&number=4
router.get('/sorted/date', (req, res, next) => {
    const order = req.query.order; // -1 ou 1
    const skip = req.query.skip; // nombre de answers renvoyes
    const number = req.query.number; // num de page a renvoyer

    Answer.find(
        {})
        .sort({ 'date': order })
        .skip(skip * 1)
        .limit(number * 1)
        .then((answers) => res.status(200).json(answers))
        .catch(err => res.status(400).json('Error:' + err))
});

//http://localhost:5000/answers/sorted/pertinency?order=1&skip=0&number=4
router.get('/sorted/pertinency', (req, res, next) => {
    const order = req.query.order; // -1 ou 1
    const skip = req.query.skip; // nombre de answers renvoyes
    const number = req.query.number; // num de page a renvoyer

    Answer.find(
        {})
        .sort({ 'pertinency': order, 'ups': order, 'downs': -order })
        .skip(skip * 1)
        .limit(number * 1)
        .then((answers) => res.status(200).json(answers))
        .catch(err => res.status(400).json('Error:' + err))
});


////POST REQUESTS

//http://localhost:5000/answers/add
router.route('/add').post((req, res) => {
    AuthToken.findById(req.query.token)
        .then((token) => {
            const userId = token.userId;
            const remarkId = req.body.remarkId;
            const content = req.body.content;
            const newAnswer = new Answer({ userId, remarkId, content })
            newAnswer.save()
                .then((answer) => {
                    Notification.findOne(
                        {
                            postId: remarkId
                        }
                    ).then((notif) => {
                        if (notif == null) {
                            Remark.findById(remarkId)
                                .then((remark) => {
                                    const userIdOfThePoster = remark.userId
                                    const newNotif = new Notification({ postId: remarkId, userId: userIdOfThePoster })
                                    newNotif.save()
                                        .then(() => res.status(200).json('Notification created.'))
                                        .catch(err => res.status(400).json('Error:' + err))
                                })
                                .catch(err => res.status(400).json('Error:' + err))
                        } else {
                            Notification.findOneAndUpdate(
                                {
                                    postId: remarkId
                                },
                                {
                                    $inc: { numberNotifs: 1 }
                                },
                                { useFindAndModify: false } //to avoid deprecation warning
                            )
                                .then(() => res.status(200).json('Notification updated.'))
                                .catch(err => res.status(400).json('Error:' + err))
                        }

                    })
                        .catch(err => res.status(400).json('Error: ' + err));
                })
                .catch(err => res.status(400).json('Error: ' + err));

        })
        .catch(err => {
            res.status(401).json('Authentication Error: ' + err)
        })
});

////PUT REQUESTS

//
router.put('/up', (req, res, next) => {
    AuthToken.findById(req.query.token)
        .then((token) => {
            User.findOneAndUpdate(
                {_id : token.userId}, 
                {$push : {ups : req.query.id}}, 
                {useFindAndModify: false})
                    .then(
                        Answer.findOneAndUpdate(
                            {
                                _id: req.query.id
                            },
                            {
                                $inc: { ups: 1, pertinency: 1 }
                            },
                            { useFindAndModify: false } //to avoid deprecation warning
                        )
                            .then(() => res.status(200).json('Answer up.'))
                            .catch(err => res.status(400).json('Error:' + err))
                    )
                    .catch(err => {
                        res.status(401).json('Authentication Error: ' + err)
                    })
        })
            
});

//
router.put('/down', (req, res, next) => {
    AuthToken.findById(req.query.token)
        .then((token) => {
            User.findOneAndUpdate(
                {_id : token.userId}, 
                {$push : {downs : req.query.id}}, 
                {useFindAndModify: false})
                .then(
                    Answer.findOneAndUpdate(
                        {
                            _id: req.query.id
                        },
                        {
                            $inc: { downs: 1, pertinency: -1 }
                        },
                        { useFindAndModify: false } //to avoid deprecation warning
                    )
                        .then(() => res.status(200).json('Answer down.'))
                        .catch(err => res.status(400).json('Error:' + err))
                )
            
        })
        .catch(err => {
            res.status(401).json('Authentication Error: ' + err)
        })
});


////DELETE REQUESTS

//http://localhost:5000/answers/delete?id=5e591583dd55fc5880d34ca3
router.delete('/delete', (req, res, next) => {
    AuthToken.findById(req.query.token)
        .then((token) => {
            User.findById(token.userId)
                .then((err, user) => {
                    if (user.admin) {
                        Answer.findOneAndDelete({
                            _id: req.query.id
                        })
                            .then((answer) => res.status(200).json("The following answer has been deleted by an administrator: " + answer))
                            .catch(err => res.status(400).json('Error:' + err))
                    } else {
                        res.status(403).json('Permission Error:' + err)
                    }
                })
        })

});

module.exports = router;
const express = require('express');
const router = express.Router();
const Answer = require('../models/answer.model')

////GET REQUESTS

//http://localhost:5000/answers/?id=5e500b489febd9351c7bdac1
router.get('/', (req,res,next) => {
    Answer.findOne({ 
        _id: req.query.id 
    })
    .then((answer) => res.status(200).json(answer))
    .catch(err => res.status(400).json('Error:' + err))
});

//
router.get('/findByRemark', (req,res,next) => {
    Answer.find({ 
        remarkId: req.query.id 
    })
    .then((answers) => res.status(200).json(answers))
    .catch(err => res.status(400).json('Error:' + err))
});

//http://localhost:5000/answers/findByUserId?id=5e500b859febd9351c7bdac2
router.get('/findByUserId', (req,res,next) => {
    Answer.find({ 
        userId: req.query.id
    })
    .then((answers) => res.status(200).json(answers))
    .catch(err => res.status(400).json('Error:' + err))
});

//http://localhost:5000/answers/sorted/date?order=1&skip=0&number=4
router.get('/sorted/date', (req,res,next) => {
    const order = req.query.order; // -1 ou 1
    const skip = req.query.skip; // nombre de answers renvoyes
    const number = req.query.number; // num de page a renvoyer

    Answer.find(
        {}        )
        .sort({'date': order})
        .skip(skip*1)
        .limit(number*1)
    .then((answers) => res.status(200).json(answers))
    .catch(err => res.status(400).json('Error:' + err))
});

//http://localhost:5000/answers/sorted/pertinency?order=1&skip=0&number=4
router.get('/sorted/pertinency', (req,res,next) => {
    const order = req.query.order; // -1 ou 1
    const skip = req.query.skip; // nombre de answers renvoyes
    const number = req.query.number; // num de page a renvoyer

    Answer.find(
        {}        )
        .sort({'pertinency': order, 'ups': order, 'downs': -order})
        .skip(skip*1)
        .limit(number*1)
    .then((answers) => res.status(200).json(answers))
    .catch(err => res.status(400).json('Error:' + err))
});


////POST REQUESTS

//http://localhost:5000/answers/add
router.route('/add').post((req, res) =>{
    const userId = req.body.userId; 
    const remarkId = req.body.remarkId;
    const content = req.body.content;
    const newAnswer = new Answer({ userId, remarkId, content })
    newAnswer.save()
    .then(() => res.status(200).json('Answer added.'))
    .catch(err => res.status(400).json('Error: ' + err));    
});

////PUT REQUESTS

//
router.put('/up', (req,res,next) => {
    Answer.findOneAndUpdate(
    { 
        _id: req.query.id
    },
    {
        $inc : {ups : 1, pertinency: 1}
    },
    {useFindAndModify:false} //to avoid deprecation warning
    )
    .then(() => res.status(200).json('Answer up.'))
    .catch(err => res.status(400).json('Error:' + err))
});

//
router.put('/down', (req,res,next) => {
    Answer.findOneAndUpdate(
    { 
        _id: req.query.id
    },
    {
        $inc : {downs : 1, pertinency: -1}
    },
    {useFindAndModify:false} //to avoid deprecation warning
    )
    .then(() => res.status(200).json('Answer down.'))
    .catch(err => res.status(400).json('Error:' + err))
});


////DELETE REQUESTS

//http://localhost:5000/answers/delete?id=5e591583dd55fc5880d34ca3
router.delete('/delete', (req,res,next) => {
    Answer.findOneAndDelete({ 
        _id: req.query.id 
    })
    .then((answer) => res.status(200).json("The answer has been deleted."))
    .catch(err => res.status(400).json('Error:' + err))
});

module.exports = router;
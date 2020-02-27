const express = require('express');
const router = express.Router();
const Remark = require('../models/remark.model')

////GET REQUESTS

//http://localhost:5000/remarks/?id=5e500b489febd9351c7bdac1
router.get('/', (req,res,next) => {
    Remark.findOne({ 
        _id: req.query.id 
    })
    .then((remark) => res.status(200).json(remark))
    .catch(err => res.status(400).json('Error:' + err))
});

//http://localhost:5000/remarks/findByUserId?id=5e500b859febd9351c7bdac2
router.get('/findByUserId', (req,res,next) => {
    Remark.find({ 
        userId: req.query.id
    })
    .then((remarks) => res.status(200).json(remarks))
    .catch(err => res.status(400).json('Error:' + err))
});

//http://localhost:5000/remarks/sorted/date?order=1&skip=0&number=4
router.get('/sorted/date', (req,res,next) => {
    const order = req.query.order; // -1 ou 1
    const skip = req.query.skip; // nombre de remarks renvoyes
    const number = req.query.number; // num de page a renvoyer

    Remark.find(
        {}        )
        .sort({'date': order})
        .skip(skip*1)
        .limit(number*1)
    .then((remarks) => res.status(200).json(remarks))
    .catch(err => res.status(400).json('Error:' + err))
});

//http://localhost:5000/remarks/sorted/heared?order=1&skip=0&number=4
router.get('/sorted/heared', (req,res,next) => {
    const order = req.query.order; // -1 ou 1
    const skip = req.query.skip; // nombre de remarks renvoyes
    const number = req.query.number; // num de page a renvoyer

    Remark.find(
        {}        )
        .sort({'heared': order})
        .skip(skip*1)
        .limit(number*1)
    .then((remarks) => res.status(200).json(remarks))
    .catch(err => res.status(400).json('Error:' + err))
});


////POST REQUESTS

//http://localhost:5000/remarks/add
router.route('/add').post((req, res) =>{
    const userId = req.body.userId; 
    const content = req.body.content;
    const newRemark = new Remark({ userId,content })
    newRemark.save()
    .then(() => res.status(200).json('Remark added.'))
    .catch(err => res.status(400).json('Error: ' + err));    
});

////PUT REQUESTS

//
router.put('/heared', (req,res,next) => {
    Remark.findOneAndUpdate(
    { 
        _id: req.query.id
    },
    {
        $inc : {heared : 1}
    },
    {useFindAndModify:false} //to avoid deprecation warning
    )
    .then(() => res.json('Remark heared one more time.'))
    .catch(err => res.status(400).json('Error:' + err))
});


////DELETE REQUESTS

//http://localhost:5000/remarks/delete?id=5e57d25f4b249c3a740985dd
router.delete('/delete', (req,res,next) => {
    Remark.findOneAndDelete({ 
        _id: req.query.id 
    })
    .then((remark) => res.status(200).json("The remark has been deleted."))
    .catch(err => res.status(400).json('Error:' + err))
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Remark = require('../models/remark.model');
var aws = require('aws-sdk');
var config = require('../config');
var uuid = require('uuid'); //je sais pas trop ce que c'est

////GET REQUESTS

//http://localhost:5000/remarks/?id=5e500b859febd9351c7bdac2
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

//http://localhost:5000/remarks/sorted/heard?order=1&skip=0&number=4
router.get('/sorted/heard', (req,res,next) => {
    const order = req.query.order; // -1 ou 1
    const skip = req.query.skip; // nombre de remarks renvoyes
    const number = req.query.number; // num de page a renvoyer

    Remark.find(
        {}        )
        .sort({'heard': order})
        .skip(skip*1)
        .limit(number*1)
    .then((remarks) => res.status(200).json(remarks))
    .catch(err => res.status(400).json('Error:' + err))
});

router.route('/getSignedUrl').get((req, res, next) => {
    //postURL: https://strikeback-s3.s3.amazonaws.com/c7cf3e30-084d-4955-8037-10c86253a539?AWSAccessKeyId=AKIAYZWWZWNSHS3NC3LM&Content-Type=image%2Fjpeg&Expires=1583159168&Signature=SSPzDbLFKMvmafM1CbLLPf1J6Yk%3D
    //getURL: https://strikeback-s3.s3.amazonaws.com/c7cf3e30-084d-4955-8037-10c86253a539
    var s3 = new aws.S3();
    s3.config.update({accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey});

    var params = {
        Bucket: 'strikeback-s3', // your bucket name
        Key:  uuid.v4(), // this generates a unique identifier
        Expires: 100, // number of seconds in which image must be posted
        ContentType: 'image/jpeg' // must match "Content-Type" header of Alamofire PUT request
    };
    s3.getSignedUrl('putObject', params, function(err, signedURL) {
        if (err) {
            console.log(err);
            return next(err);
        } else {
            return res.json({postURL: signedURL, getURL: signedURL.split("?")[0]});
        }
    });
});

////POST REQUESTS

//http://localhost:5000/remarks/add
router.route('/add').post((req, res) =>{
    const userId = req.body.userId; 
    const title = req.body.title;
    const text = req.body.text;
    const image = req.body.image;
    const newRemark = new Remark({ userId, title, text, image })
    newRemark.save()
    .then((rem) => res.status(200).send(rem._id)) //attention pas en json
    .catch(err => {
        res.status(400).json('Error: ' + err)
    });    
});

////PUT REQUESTS

//
router.put('/heard', (req,res,next) => {
    Remark.findOneAndUpdate(
    { 
        _id: req.query.id
    },
    {
        $inc : {heard : 1}
    },
    {useFindAndModify:false} //to avoid deprecation warning
    )
    .then(() => res.status(200).json('Remark heard one more time.'))
    .catch(err => res.status(400).json('Error:' + err))
});

//http://localhost:5000/remarks/image
router.put('/image', (req,res,next) => {
    const link = req.body.url
    const remarkId = req.body.id
    Remark.findOneAndUpdate(
    { 
        _id: remarkId
    },{
        $set: {
            image: link
          }
    },
    {useFindAndModify:false} //to avoid deprecation warning
    )
    .then(() => res.status(200).json('Image updated'))
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
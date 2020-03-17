const router = require('express').Router();
let Report = require('../models/report.model');
let AuthToken = require('../models/authToken.model');

//Getting every reports in the DB
router.route('/').get((req, res) => {
    Report.find()
    .then(reports => res.status(200).json(reports))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Incrementing the number of reports of a post
router.route('/add').put((req, res) =>{
    
    Report.count({postId: req.body.postId, type : req.body.type}, function (err, count){ 
        if(count>0){
            Report.findOneAndUpdate({postId : req.body.postId}, {$inc : {numberReportings : 1}})
                .then(() => res.status(200).json('Report updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        }else{
            const postId = req.body.postId; 
            const type = req.body.type;
            const newReport = new Report({postId, type});

            newReport.save()
            .then(() => res.status(200).json('Report added'))
            .catch(err => res.status(400).json('Error: ' + err));
        }
    }).catch(err => res.status(400).json('Error: ' + err)); 
    
});

//Getting reports concerning a post
router.route('/findByPostId').get((req, res) => {
    Report.findOne({postId : req.query.id})
        .then(report => res.status(200).json(report))
        .catch(err  => res.status(400).json('Error : ' + err));
});

//Deleting reports concerning a post
router.route('/deleteByPostId').delete((req, res) => {
    Report.findOneAndDelete({postId : req.body.postId})
        .then(() => res.status(200).json('Report deleted'))
        .catch(err => res.status(400).json('Error : ' + err));
});



module.exports = router;
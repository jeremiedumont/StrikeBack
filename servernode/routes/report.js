const router = require('express').Router();
let Report = require('../models/report.model');
let AuthToken = require('../models/authToken.model');
const User = require('../models/user.model');

//Getting every reports in the DB
//ADMIN only
router.route('/').get((req, res) => {
    AuthToken.findById(req.query.token)
        .then((token) => {
            User.findById(token.userId)
                .then((user) => {
                    if (user.admin) {
                        Report.find({ alreadyChecked: false }).sort({ 'numberReportings': -1 }) //décroissant
                            .then(reports => res.status(200).json(reports))
                            .catch(err => res.status(400).json('Error: ' + err));
                    } else {
                        res.status(403).json('You are not an administrator of Strike Back.')
                    }
                })
                .catch(err => res.status(500).json('Server Error: ' + err))
        })
        .catch(err => res.status(401).json('Token Error: ' + err))
});

//Incrementing the number of reports of a post
router.route('/add').put((req, res) => {
    AuthToken.findById(req.query.token)
        .then((token) => {
            User.findOneAndUpdate(
                { _id: token.userId },
                { $push: { reports: req.body.postId } },
                { useFindAndModify: false })
                .then(
                    Report.countDocuments({ postId: req.body.postId, type: req.body.type }, function (err, count) {
                        if (count > 0) {
                            Report.findOneAndUpdate(
                                { postId: req.body.postId },
                                { $inc: { numberReportings: 1 } },
                                { useFindAndModify: false }
                            )
                                .then(() => res.status(200).json('Report updated'))
                                .catch(err => res.status(400).json('Error: ' + err));
                        } else {
                            const postId = req.body.postId;
                            const type = req.body.type;
                            const newReport = new Report({ postId, type });

                            newReport.save()
                                .then(() => res.status(200).json('Report added'))
                                .catch(err => res.status(400).json('Error: ' + err));
                        }
                    }).catch(err => res.status(400).json('Error: ' + err))
                )
        })
});

//Getting reports concerning a post
router.route('/findByPostId').get((req, res) => {
    Report.findOne({ postId: req.query.id })
        .then(report => res.status(200).json(report))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Deleting a report concerning a post
router.route('/dismissByPostId').put((req, res) => {
    Report.findOneAndUpdate(
        { postId: req.body.postId },
        { alreadyChecked: true },
        { useFindAndModify: false }
    )
        .then((report) => { res.status(200).json('Report dismissed') })
        .catch(err => res.status(400).json('Error : ' + err));
});

router.route('/delete').delete((req, res) => {
    Report.findOneAndDelete(
        { _id: req.query.id }
    )
        .then((report) => { res.status(200).json('Report dismissed') })
        .catch(err => res.status(400).json('Error : ' + err));
});


module.exports = router;
const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Route used for signup
router.route('/signup').post((req, res) =>{
    const pseudo = req.body.pseudo;
    const password = req.body.password;
    const color = req.body.color;
    const email = req.body.email;
    const admin = req.body.admin;
    const newUser = new User({pseudo : pseudo, email : email, admin : admin, color : color, password : password})

    newUser.save()
    .then(() => res.status(200).json('User added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Route used for login
router.route('/login').post((req, res) => {
    User.findOne({pseudo : req.body.pseudo, password : req.body.password})
    .then(user => res.json(user))
    .catch(err  => res.status(400).json('Error : ' + err));
});

//Route used for deleteing a user
router.route('/delete').delete((req, res) => {
    User.findOne({pseudo : req.body.pseudo, password : req.body.password}, (error, user) => {
        if(user==null){
            res.send('User not found')
        }else{
            User.deleteOne({pseudo : req.body.pseudo, password : req.body.password})
            .then(() => res.json('User deleted'))
            .catch(err => res.status(400).json('Error : ' + err));
        }
    });   
});

//Route used for updating the users's password
router.route('/updatePassword/').put((req, res) => {
    User.findById(req.body.id)
        .then(user => {
            user.password = req.body.password;

            user.save()
                .then(() => res.json('User updated'))
                .catch(err => res.status(400).json('Error : ' + err))
        }).catch(err => res.status(400).json('Error : ' + err));
});

//Route used for updating the users's color
router.route('/updateColor/').put((req, res) => {
    User.findById(req.body.id)
        .then(user => {
            user.color = req.body.color;

            user.save()
                .then(() => res.json('User updated'))
                .catch(err => res.status(400).json('Error : ' + err))
        }).catch(err => res.status(400).json('Error : ' + err));
});


module.exports = router;
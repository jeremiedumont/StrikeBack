const router = require('express').Router();
let User = require('../models/user.model');

//
router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//http://localhost:5000/users/findById?id=5e568d0d0ee9a81b14264091
router.route('/findById').get((req, res) => {
    User.findOne({ 
        _id: req.query.id 
    })
    .then(user => res.json(
        {
            "_id": user._id,
            "pseudo": user.pseudo,
            "admin": user.admin,
            "email": user.email, 
            "creationDate": user.creationDate,
            "color": user.color
        }
    ))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Route used for signup
router.route('/signup').post((req, res) =>{
    const pseudo = req.body.pseudo;
    const password = req.body.password;
    const color = req.body.color;
    const email = req.body.email;
    //const admin = req.body.admin; //pas top safety
    const newUser = new User({pseudo : pseudo, email : email, color : color, password : password})

    newUser.save()
    .then(() => res.status(200).json('User added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Route used for login
router.route('/login').post((req, res) => {
    User.findOne({ pseudo : req.body.pseudo })
    .then(user => {
        if (user == null) {
            res.status(401).json('Error : Wrong pseudo')
        } else if (user.password != req.body.password) {
            res.status(401).json('Error : Wrong password')
        } else {
            res.status(200).json(user)
        }
    })
    .catch(err  => res.status(400).json('Error : ' + err));
});

//Route used for deleting a user
router.route('/delete').delete((req, res) => {
    User.findOne({pseudo : req.body.pseudo }, (error, user) => {
        if(user==null){
            res.send('User not found')
        }else{
            if (user.password == req.body.password){
                User.deleteOne({pseudo : req.body.pseudo})
                .then(() => res.status(200).json('User deleted'))
                .catch(err => res.status(400).json('Error : ' + err));
            }
        }
    });   
});

//Route used for updating the users's password
//https://strike-back.herokuapp.com/users/updatePassword
router.route('/updatePassword').put((req, res) => {
    User.findById(req.body.userId)
        .then(user => {
            if (user.password == req.body.oldPassword) {
                user.password = req.body.newPassword;
            } else {
                res.status(401).json('The old password is wrong.')
            }

            user.save()
                .then(() => res.status(200).json('Password updated'))
                .catch(err => res.status(400).json('Error : ' + err))
        }).catch(err => res.status(400).json('Error : ' + err));
});

//Route used for updating the users's color
router.route('/updateColor').put((req, res) => {
    User.findById(req.body.id)
        .then(user => {
            user.color = req.body.color;

            user.save()
                .then(() => res.status(200).json('User updated'))
                .catch(err => res.status(400).json('Error : ' + err))
        }).catch(err => res.status(400).json('Error : ' + err));
});


module.exports = router;
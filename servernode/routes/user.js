const router = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

let User = require('../models/user.model');
let AuthToken = require('../models/authToken.model');

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

router.route('/findByToken').get((req, res) => {
    AuthToken.findById(req.query.token)
        .then((token) => {
            User.findOne({ 
                _id: token.userId 
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
        }).catch(err => res.status(401).json('Authentication Error: ' + err))
});

//Route used for signup
router.route('/signup').post((req, res) =>{
    const pseudo = req.body.pseudo;
    const password = req.body.password;
    const color = req.body.color;
    const email = req.body.email;
    const hash = bcrypt.hashSync(password, saltRounds);
    //const admin = req.body.admin; //pas top safety
    const newUser = new User({pseudo : pseudo, email : email, color : color, password : hash})

    newUser.save()
    .then(() => res.status(200).json("SignUp success"))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Route used for login
router.route('/login').post((req, res) => {
    var validationLogin = false
    User.findOne({ pseudo : req.body.pseudo })
    .then(user => {
        if (user == null) {
            res.status(401).json('Error : Wrong pseudo')
            
        }
        else if(!req.body.autologin){
            console.log(bcrypt.hashSync(req.body.password, saltRounds))
            if (!(bcrypt.compareSync(req.body.password, user.password))) {
                res.status(401).json('Error : Wrong password hihi')
            } else {
                validationLogin = true
            }
        }
        else if (req.body.autologin){
            if (req.body.password != user.password) {
                res.status(401).json('Error : Wrong password')
            } else {
                validationLogin = true
            }
        } 
        if (validationLogin) { // si il a déjà un token on le supprime et on crée un nouveau, sinon on crée un nouveau

            AuthToken.findOneAndDelete({userId: user._id})
            .catch(err => res.status(400).json('Error: ' + err))

            const newToken = new AuthToken({userId: user._id})
            console.log(user.ups)
            newToken.save()
            .then((token) => res.status(200).json({
                _id: user._id,
                pseudo: user.pseudo,
                password : user.password,
                email: user.email,
                creationDate: user.creationDate,
                color: user.color,
                admin: user.admin,                
                authToken: token._id,
                ups : user.ups,
                downs : user.downs,
                heards : user.heards,
                reports : user.reports
            }))
            .catch(err => res.status(400).json('Error: ' + err));
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
            if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
                user.password = bcrypt.hashSync(req.body.newPassword, saltRounds);
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
    User.findById(req.body.userId)
        .then(user => {
            user.color = req.body.color;

            user.save()
                .then(() => res.status(200).json('User updated'))
                .catch(err => res.status(400).json('Error : ' + err))
        }).catch(err => res.status(400).json('Error : ' + err));
});


module.exports = router;
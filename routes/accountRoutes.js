const User = require('../models/UserModel');
const { showErrorMessage } = require('../Common/utils');

const Router = require('express').Router();
const bcrypt = require('bcrypt');
const { errorMessage } = require('../Common/utils');

Router.post('/login', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({ email: email}).then(user => {
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return errorMessage(res, 500, err.message, err);
                }
                if (result) {
                    res.status(200).json({
                        data: user,
                        message: "Successfully logged in."
                    });
                }
            })
        }
        else {
            showErrorMessage(res, 500, "Username or password did not match.");
        }
    }).catch(error => {
        showErrorMessage(res, 500, "Some error occured while logging in. Please try again");
    })

});

Router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hassedPass) => {
        if (err) {
            return errorMessage(res, 500, err.message, err);
        }
        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hassedPass,
            email: req.body.email,
            phone: req.body.phone
        });
        User.find({ email: user.email }).then(data => {
            if (data.length > 0) {
                showErrorMessage(res, 500, "Email already exists. please login to continue.");
            }
            else {
                User.create(user).then(data => {
                    res.status(200).json({
                        data: user,
                        message: "Successfully signed up."
                    });
                }).catch(err => {
                    showErrorMessage(res, 500, "Some error occured while signing up. Please try again");
                });
            }
        })
    });
});

module.exports = Router

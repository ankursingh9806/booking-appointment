const path = require('path');
const Sequelize = require('sequelize');
const User = require('../models/userModel');

exports.getBookingPage = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'public', 'html', 'index.html'));
};

exports.getUserData = (req, res, next) => {
    User.findAll()
        .then((data) => {
            // console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.error('error fetching user:', err);
            res.status(500).json({ error: 'internal server error' });
        });
};

exports.postAddUser = (req, res, next) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    User.create({
        name: name,
        phone: phone,
        email: email,
    })
        .then((data) => {
            // console.log(data)
            console.log('user added');
            res.redirect('/get');
        })
        .catch((err) => {
            console.error('error adding user:', err);
            res.status(500).json({ error: 'internal server error' });
        });
};

exports.getDeleteUser = (req, res, next) => {
    const id = req.params.id;
    // console.log(id);
    User.findByPk(id)
        .then((user) => {
            // console.log(user);
            if (!user) {
                return res.status(404).json({ error: 'user not found' });
            }
            return user.destroy();
        })
        .then((result) => {
            // console.log(result);
            console.log('user deleted');
            res.redirect('/get');
        })
        .catch((err) => {
            console.error('error deleting user:', err);
            res.status(500).json({ error: 'internal server error' });
        });
};
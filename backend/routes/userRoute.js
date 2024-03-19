const express = require('express');
const path = require('path');
const userController = require('../controllers/userController');

const router = express.Router();

router.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'public')));

router.get('/', userController.getBookingPage);

router.get('/user-data', userController.getUserData);

router.get('/delete-user/:id', userController.getDeleteUser);

router.post('/add-user', userController.postAddUser);

module.exports = router;
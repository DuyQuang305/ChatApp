const express = require('express');

const router = express.Router();

const usersController = require('../controllers/UsersController');

router.get('/:id', usersController.show);

module.exports = router;
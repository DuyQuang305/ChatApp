const express = require('express');

const router = express.Router();

const setAvatarController = require('../controllers/setAvatarController');

router.post('/:id', setAvatarController.setAvatar);

module.exports = router;
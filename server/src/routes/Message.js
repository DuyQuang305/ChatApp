const express = require('express');

const router = express.Router();

const messeageController = require('../controllers/MessageController');

router.post('/showMsg', messeageController.showMessage);
router.post('/addMsg', messeageController.addMessage);

module.exports = router;
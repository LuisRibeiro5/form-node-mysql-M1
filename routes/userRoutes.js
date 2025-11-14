const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require(path.join(__dirname, '..', 'controller', 'userController'))

//Rota de sucesso
router.get('/sistema', userController.getSistema);

module.exports = router;
const express = require('express');
const router = express.Router();
const path = require('path');
const authController = require(path.join(__dirname, '..', 'controller', 'authController'));

//Pagina inicial com o formulário
router.get('/formulario', authController.getFormulario);

//Processa o formulário
router.post('/formulario', authController.postFormulario);

// Rota para a página de login
router.get('/login',authController.getLogin);

// Rota para processar login
router.post('/login',authController.postLogin);

// Rota para a página home
router.get('/home', authController.getHome);

// Rota para logout
router.post('/logout', authController.postLogout);

module.exports = router;
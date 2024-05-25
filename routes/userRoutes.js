const express = require('express');
let router = express.Router();
const authController = require('../controllers/authController')

/* GESTIÓN DE USUARIOS CON JTW */
//  Login de usuarios
router.post('/login', authController.login);

//  Registro de usuarios
router.post('/register', authController.register);

//  Logout de usuarios
router.get('/logout', authController.logout);

module.exports = router;
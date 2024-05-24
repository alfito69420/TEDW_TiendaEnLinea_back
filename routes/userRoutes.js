const express = require('express');
let router = express.Router();

let connection = require('../database/MySQLConnections').databaseConnection;
const authController = require('../controllers/authController')

/* GESTIÓN DE USUARIOS CON JTW */
//  Login de usuarios
router.post('/login', authController.login);
router.post('/login2', authController.login2);

//  Registro de usuarios
router.post('/register', authController.register);

module.exports = router;
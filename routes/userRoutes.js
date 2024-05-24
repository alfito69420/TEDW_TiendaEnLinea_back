
//  JWT
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const secretKey = 'TuClaveSecreta';

const express = require('express');
let router = express.Router();

let connection = require('../database/MySQLConnections').databaseConnection;
const authController = require('../controllers/authController')

/* GESTIÓN DE USUARIOS CON JTW */

//  Login de usuarios
router.post('/login', authController.login);

//  Registro de usuarios
router.post('/register', authController.register);

module.exports = router;
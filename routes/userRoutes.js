const express = require('express');
let router = express.Router();
const authController = require('../controllers/authController')
const verificacion = require('../middleware/verificacion');

/* GESTIÓN DE USUARIOS CON JTW */
//  Login de usuarios
router.post('/login', authController.login);

//  Registro de usuarios
router.post('/register', authController.register);

//  Logout de usuarios
router.get('/logout', authController.logout);

//  Update de usuarios
router.post('/update/:id', verificacion, authController.update);

//  Delete de usuarios
//router.delete('/delete/:id', authController.delete);

//  Select all usuarios
router.get('/get-all', verificacion, authController.selectAll);

//  Select one usuario
router.get('/get-one/:id', verificacion, authController.selectOne);

module.exports = router;
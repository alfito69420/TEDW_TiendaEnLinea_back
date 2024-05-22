
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
router.get('/login', (req, res) => {

});

//  Registro de usuarios
router.post('/register', authController.register);

// Ruta para el inicio de sesión
/* app.post('/login', (req, res) => {

    const login_sql = "SELECT * FROM Usuario WHERE email = ? AND password = ?";

    values = [
        req.body.email,
        req.body.contrasena
    ]

    connection.query(login_sql, values, (err, data) => {
        if (condition) {
            return res.json("Error")
        }

        if (data.length > 0) {
            const id = data[0].usuario_id;
            const token = jwt.sign({ id }, secretKey, { expiresIn: '1h' });

/* 
            // Generar token JWT
            jwt.sign({ id }, secretKey, { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    res.status(500).json({ error: 'Error al generar el token' });
                } else {
                    res.json({ token });
                }
            });
 
            return res.json({Login: true, token: data});
        } else {
            return res.json("Failed")
        }
    })


}); */

module.exports = router;
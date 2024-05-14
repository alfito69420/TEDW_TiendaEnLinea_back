
//  JWT
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const secretKey = 'TuClaveSecreta';

const express = require('express');
let router = express.Router();

let connection = require('../database/MySQLConnections').databaseConnection;
const authController = require('../controllers/authController')

//  SELECT PRODUCTOS
router.get('/get-all-products', (req, res) => {
    connection.query('SELECT * FROM producto', (err, rows, fields) => {
        if (err) throw err;

        rows.forEach(row => {
            console.log('ID:', row.id_producto); // Cambia 'id' al nombre real del campo
            console.log('Producto:', row.nombre); // Cambia 'nombre' al nombre real del campo
        });
        console.log(rows);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(rows);
    });

});

//  UPDATE PRODUCTOS
router.post('/update/:id', (req, res) => {
    var update_producto_sql = "UPDATE producto SET nombre = ?, descripcion = ?, precio = ?, cantidad = ?, photo = ?, id_cat_producto = ? WHERE id_producto = ?";

    var values = [
        req.body.nombre,
        req.body.descripcion,
        req.body.precio,
        req.body.cantidad,
        req.body.photo,
        req.body.id_cat_producto,
        // El ID del vehículo se obtiene de los parámetros de la URL
        req.params.id
    ];

    console.log(req.body);

    connection.query(update_producto_sql, values, function (err, result) {
        if (err) {
            return res.status(500).json(err);
        } else {
            console.log("Number of records updated: " + result.affectedRows);
            return res.status(200).json(req.body);
        }
    });
})

//  CREATE PRODUCTOS
router.post('/register-product', (req, res) => {
    var register_producto_sql = "INSERT INTO producto (nombre, descripcion, precio, cantidad, photo, id_cat_producto) VALUES (?)";

    var values = [
        req.body.nombre,
        req.body.descripcion,
        req.body.precio,
        req.body.cantidad,
        req.body.photo,
        req.body.id_cat_producto
    ];

    connection.query(register_producto_sql, [values], function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }
        else {
            console.log("Number of records inserted: " + result.affectedRows);
            return res.status(200).json(req.body);
        }
    });
})

//  DELETE PRODUCTOS
router.delete('/delete/:id', function (req, res, next) {
    //var product = { id: req.params.id }

    connection.query('DELETE FROM producto WHERE id_producto = ?', req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        } else {
            //req.flash('success', 'User has been deleted successfully! id = ' + req.params.id)
            console.log("Number of records deleted: " + result.affectedRows);
            // redirect to users list page or send a success response
            return res.status(200).json({ message: 'User deleted successfully' });
        }
    });
});

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
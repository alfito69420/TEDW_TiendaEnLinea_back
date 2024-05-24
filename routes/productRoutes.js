const express = require('express');
let router = express.Router();
const authController = require('../controllers/authController')
const verificacion = require('../middleware/verificacion');
let connection = require('../database/MySQLConnections').databaseConnection;
//const authController = require('../controllers/authController')

//  SELECT PRODUCTOS
router.get('/get-all',verificacion, (req, res) => {
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
router.post('/register-product', authController.isAuthenticated, (req, res) => {
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

module.exports = router;
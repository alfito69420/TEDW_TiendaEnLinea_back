const express = require('express');
let router = express.Router();
const authController = require('../controllers/authController')
const verificacion = require('../middleware/verificacion');
let connection = require('../database/MySQLConnections').databaseConnection;

//  SELECT BY ID
router.get('/get-one/:id_usuario', verificacion, (req, res) => {

    const id_usuario = req.params.id_usuario;

    connection.query('select p.nombre, p.descripcion, orden_compra.cantidad, monto_descuento, monto_total from orden_compra join producto p on orden_compra.id_producto = p.id_producto where id_usuario = ?;', [id_usuario], (err, rows, fields) => {
        if (err) throw err;

        rows.forEach(row => {
            //console.log('ID:', row.id_catproducto);
            //console.log('Categoria:', row.categoria);
        });
        console.log(rows);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(rows);
    });
});

//  SELECT ALL
router.get('/get-all', verificacion, (req, res) => {
    connection.query('SELECT * FROM orden_compra', (err, rows, fields) => {
        if (err) throw err;

        rows.forEach(row => {
            //console.log('ID:', row.id_producto);
            //console.log('Producto:', row.nombre);
        });
        console.log(rows);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(rows);
    });
});

//  CREATE 
router.post('/register-orden-compra', verificacion, (req, res) => {
    var register_orden_sql = "INSERT INTO orden_compra (monto_descuento, monto_total, cantidad, id_usuario, id_producto) VALUES (?)";

    var values = [
        req.body.monto_descuento,
        req.body.monto_total,
        req.body.cantidad,
        req.body.id_usuario,
        req.body.id_producto
    ];

    connection.query(register_orden_sql, [values], function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }
        else {
            return res.status(200).json(req.body);
        }
    });
})



module.exports = router;
const express = require('express');
let router = express.Router();
const verificacion = require('../middleware/verificacion');
let connection = require('../database/MySQLConnections').databaseConnection;

//  SELECT BY ID
router.get('/get-one/:id_usuario', verificacion, (req, res) => {

    const id_usuario = req.params.id_usuario;

    connection.query('SELECT * FROM direccion WHERE id_usuario = ?', [id_usuario], (err, rows, fields) => {
        if (err) throw err;

        rows.forEach(row => {
            console.log('ID:', row.id_direccion);
            console.log('Usuario:', row.id_usuario);
        });
        console.log(rows);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({message: "Direccion encontrada en la base de datos.", data: rows});
    });
});

//  CREATE DIRECCION
router.post('/register-direccion', verificacion, (req, res) => {
    var register_producto_sql = "INSERT INTO direccion (calle, ciudad, estado, codigo_postal, id_usuario) VALUES (?)";

    var values = [
        req.body.calle,
        req.body.ciudad,
        req.body.estado,
        req.body.codigo_postal,
        req.body.id_usuario
    ];

    connection.query(register_producto_sql, [values], function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }
        else {
            console.log("Number of records inserted: " + result.affectedRows);
            return res.status(200).json({message: "Direccion creada exitosamente.", data: req.body});
        }
    });
})

//  UPDATE
router.post('/update/:id_usuario', verificacion, (req, res) => {
    var update_categoria = "UPDATE direccion set calle = ?, ciudad = ?, estado = ?, codigo_postal = ? WHERE id_usuario = ?";

    var values = [
        req.body.calle,
        req.body.ciudad,
        req.body.estado,
        req.body.codigo_postal,
        req.params.id_usuario
    ];

    console.log(req.body);

    connection.query(update_categoria, values, function (err, result) {
        if (err) {
            return res.status(500).json(err);
        } else {
            console.log("Number of records updated: " + result.affectedRows);
            return res.status(200).json({message: "Direccion actualizada exitosamente.", data: req.body});
        }
    });
})

module.exports = router;
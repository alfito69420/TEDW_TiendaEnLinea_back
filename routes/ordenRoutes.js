const express = require('express');
let router = express.Router();
const verificacion = require('../middleware/verificacion');
let connection = require('../database/MySQLConnections').databaseConnection;

//  SELECT BY ID
//  Obtiene las ordenes de compra realizadas por un usuario en especifico
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

//  Total de ordenes y productos comprados
router.get('/get-all-ordenes-compras', verificacion, (req, res) => {
    connection.query('SELECT COUNT(DISTINCT o.id_orden_compra) AS total_orden_compra, SUM(o.cantidad) AS total_productos FROM orden_compra o JOIN producto p ON o.id_producto = p.id_producto;', (err, rows, fields) => {
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

//  SELECT ALL
//  Devuelve todas las ordenes de compra realizadas por todos los usuarios registrados
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
    var register_orden_sql = "INSERT INTO orden_compra (monto_descuento, monto_total, cantidad, id_usuario, id_producto, fecha) VALUES (?)";

    const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');

    var values = [
        req.body.monto_descuento,
        req.body.monto_total,
        req.body.cantidad,
        req.body.id_usuario,
        req.body.id_producto,
        fechaActual
    ];

    connection.query(register_orden_sql, [values], function (err, result) {
        if (err) {
            return res.status(500).json({ message: "Error al generar orden de compra.", error: err });
        }
        else {
            return res.status(200).json({ message: "La orden de compra se ha generado exitosamente.", data: req.body });
        }
    });
})

// Total de ventas semanales con clientes y productos
router.get('/total-ventas-semanales', verificacion, (req, res) => {
    connection.query(`
        SELECT WEEK(fecha) AS semana, 
               SUM(monto_total) AS total_ventas,
               COUNT(DISTINCT id_usuario) AS total_clientes,
               SUM(cantidad) AS total_productos 
        FROM orden_compra 
        GROUP BY WEEK(fecha)`,
        (err, rows, fields) => {
            if (err) throw err;

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({message: "Ventas totales semanales.", data: rows});
        });
});

// Total de ventas mensuales con clientes y productos
router.get('/total-ventas-mensuales', verificacion, (req, res) => {
    connection.query(`
        SELECT MONTH(fecha) AS mes, 
               YEAR(fecha) AS anio, 
               SUM(monto_total) AS total_ventas,
               COUNT(DISTINCT id_usuario) AS total_clientes,
               SUM(cantidad) AS total_productos 
        FROM orden_compra 
        GROUP BY YEAR(fecha), MONTH(fecha)`,
        (err, rows, fields) => {
            if (err) throw err;

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({message: "Ventas totales mensuales.", data: rows});
        });
});

// Total de ventas anuales con clientes y productos
router.get('/total-ventas-anuales', verificacion, (req, res) => {
    connection.query(`
        SELECT YEAR(fecha) AS anio, 
               SUM(monto_total) AS total_ventas,
               COUNT(DISTINCT id_usuario) AS total_clientes,
               SUM(cantidad) AS total_productos 
        FROM orden_compra 
        GROUP BY YEAR(fecha)`,
        (err, rows, fields) => {
            if (err) throw err;

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ message: "Ventas totales por anio.", data: rows });
        });
});

module.exports = router;
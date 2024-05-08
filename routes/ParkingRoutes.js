const express = require('express');
let router = express.Router();

let connection = require('../database/MySQLConnections').databaseConnection;

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
    var update_producto_sql = "UPDATE producto SET nombre = ?, descripcion = ?, precio = ?, cantidad = ?, photo = ?, id_cat_producto = ?";
  
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

//  DELETE PRODUCTOS


module.exports = router;
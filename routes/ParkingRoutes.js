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

//  CREATE PRODUCTOS

//  DELETE PRODUCTOS


module.exports = router;
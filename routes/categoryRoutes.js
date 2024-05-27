const express = require('express');
let router = express.Router();
const verificacion = require('../middleware/verificacion');

let connection = require('../database/MySQLConnections').databaseConnection;

/* CATEGORIAS */
//  SELECT ALL
router.get('/get-all', (req, res) => {
    connection.query('SELECT * FROM cat_producto', (err, rows, fields) => {
        if (err) throw err;

        rows.forEach(row => {
            console.log('ID:', row.id_producto);
            console.log('Producto:', row.nombre);
        });
        console.log(rows);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({message: "Total de categorias.", data: rows});
    });
});

//  SELECT BY NAME
router.get('/get-one/:nombre', (req, res) => {

    const nombre = req.params.nombre;

    connection.query('SELECT * FROM cat_producto WHERE categoria = ?', [nombre], (err, rows, fields) => {
        if (err) throw err;

        rows.forEach(row => {
            console.log('ID:', row.id_catproducto);
            console.log('Categoria:', row.categoria);
        })
        console.log(rows);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({message: "Categoria encontrada en la base de datos.", data: rows});
    });
});

//  CREATE 
router.post('/register', verificacion, (req, res) => {
    var register_producto_sql = "INSERT INTO cat_producto (categoria, id_proveedor) VALUES (?)";

    var values = [
        req.body.categoria,
        req.body.id_proveedor
    ];

    connection.query(register_producto_sql, [values], function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }
        else {
            return res.status(200).json({message: "Categoria registrada exitosamente.", data: req.body});
        }
    });
})

//  UPDATE
router.post('/update/:id', verificacion, (req, res) => {
    var update_categoria = "UPDATE cat_producto set categoria = ?, id_proveedor = ? WHERE id_catproducto = ?";

    var values = [
        req.body.categoria,
        req.body.id_proveedor,
        req.params.id
    ];

    console.log(req.body);

    connection.query(update_categoria, values, function (err, result) {
        if (err) {
            return res.status(500).json(err);
        } else {
            console.log("Number of records updated: " + result.affectedRows);
            return res.status(200).json({message: "Categoria actualizada exitosamente.", data: req.body});
        }
    });
})

//  DELETE
router.delete('/delete/:id', verificacion, function (req, res, next) {
    //var product = { id: req.params.id }

    connection.query('DELETE FROM cat_producto WHERE id_catproducto = ?', req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        } else {
            //req.flash('success', 'User has been deleted successfully! id = ' + req.params.id)
            console.log("Number of records deleted: " + result.affectedRows);
            // redirect to users list page or send a success response
            //return res.status(200).json({ message: 'Category deleted successfully' });
            return res.status(200).json({message: "Categoria eliminada exitosamente."});
        }
    });
});

module.exports = router;
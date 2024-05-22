const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../database/MySQLConnections');

const { promisify } = require('util');

// Procedimiento para registro
exports.register = async (req, res) => {
    try {
        const { nombre, ap_paterno, ap_materno, email, contrasena } = req.body;

        // Resto de la lógica de registro
        let passHash = await bcryptjs.hash(contrasena, 8)

        //console.log(passHash);

        conexion.databaseConnection.query('INSERT INTO Usuario SET ?',
            { nombre: nombre, ap_paterno: ap_paterno, ap_materno: ap_materno, email: email, contrasena: passHash },
            (error, results) => {
                if (error) {
                    console.log(error)
                }
                res.status(200).json({ message: "Registro exitoso" });
            })
    } catch (error) {
        console.error("Error en el controlador de registro:", error);
        res.status(500).json({ error: "Hubo un error en el servidor" });
    }
};
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


//  Login
exports.login = async (req, res) => {
    try {
        const nombre = req.body.nombre;
        const contrasena = req.body.contrasena;

        console.log(nombre + " - " + contrasena);

        if (!nombre || !contrasena) {
            console.log("Ha ingresado datos vacios.")
            res.status(500).json({ error: "Hubo un error en el servidor" });
        } else {
            //console.log(nombre + " - " + contrasena);
            conexion.databaseConnection.query('SELECT * FROM Usuario WHERE nombre = ?', [nombre], async (error, results) => {
                if(results.length == 0 || ! (await bcryptjs.compare(contrasena, results[0].contrasena))) {
                    res.status(500).json({ error: "Hubo un error con las credenciales" });
                } else {
                    const id = results[0].usuario_id
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {expiresIn: process.env.JWT_TIEMPO_EXPIRA})

                    console.log("token: "+token+ " para el usuario: "+ nombre);

                    const cookieOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }

                    res.cookie('jwt', token, cookieOptions)
                    console.log("Yeah todo correcto bro")
                    res.status(200).json({ message: "Login exitoso" });
                }
            })
        }
    } catch (error) {
        console.error("Error en el controlador de login:", error);
        res.status(500).json({ error: "Hubo un error en el servidor" });
    }
} 
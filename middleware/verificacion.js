const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
//let conexion = require('../database/MySQLConnections').databaseConnection;
const conexion = require('../database/MySQLConnections');

router.use((req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    //  Si no existe un token...
    if (!token) {
        res.status(401).send({ error: 'Es necesario un token de autenticación' });
        return;
    }

    //  Limpia el token
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    //  Si existe un token...
    if (token) {
        jwt.verify(token, process.env.JWT_SECRETO, (error, decoded) => {
            if (error) {
                return res.json({ message: "El token no es válido" });
            } else {
                //req.decoded = decoded;
                //next();
                //  ROL
                const userId = decoded.id;

                // Consultar el rol del usuario en la base de datos
                conexion.databaseConnection.query('SELECT id_rol FROM Usuario WHERE usuario_id = ?', [userId], (error, results) => {
                    if (error) {
                        return res.status(500).json({ error: "Error al obtener el rol del usuario" });
                    }

                    // Verificar si el usuario tiene el rol necesario para acceder a la ruta
                    const userRoleId = results[0].id_rol;

                    let allowedRoutes = [];

                    if (userRoleId === 1) { // Si el usuario tiene el rol 1 (administrador)
                        allowedRoutes = [
                            '/api/v1/products/update/:id',
                            '/api/v1/products/delete/:id',
                            '/api/v1/products/register',
                            '/api/v1/products/get-all',
                            '/api/v1/users/get-all',
                            '/api/v1/users/logout',
                            '/api/v1/users/update/:id',
                            '/api/v1/users/get-one/:id',
                            '/api/v1/users/delete/:id',
                            '/api/v1/categories/get-all',
                            '/api/v1/categories/get-one/:nombre',
                            '/api/v1/categories/register',
                            '/api/v1/categories/update/:id',
                            '/api/v1/categories/delete/:id',
                            '/api/v1/direccion/update/:id_usuario',
                            '/api/v1/direccion/register-direccion',
                            '/api/v1/direccion/get-one/:id_usuario',
                            '/api/v1/orden/register-orden-compra',
                            '/api/v1/orden/get-one/:id_usuario',
                            '/api/v1/orden/get-all',
                            '/api/v1/orden/total-ventas-semanales',
                            '/api/v1/orden/total-ventas-mensuales',
                            '/api/v1/orden/total-ventas-anuales'
                        ];
                    } else if (userRoleId === 2) { // Si el usuario tiene el rol 2 (cliente)
                        allowedRoutes = [
                            '/api/v1/products/get-all',
                            '/api/v1/users/logout',
                            '/api/v1/categories/get-all',
                            '/api/v1/categories/get-one/calzones',
                            '/api/v1/direccion/update/14',
                            '/api/v1/direccion/register-direccion',
                            '/api/v1/direccion/get-one/:id_usuario',
                            '/api/v1/orden/register-orden-compra',
                            '/api/v1/orden/get-all/:id_usuario'
                        ];
                    } else {    //  Si el usuario tiene rol 3 (invitado)
                        allowedRoutes = [
                            '/api/v1/products/get-all',
                            '/api/v1/categories/get-all',
                            '/api/v1/categories/get-one/calzones',
                        ];
                    }

                    // Verificar si la ruta actual está permitida para el rol del usuario
                    const currentRoute = req.baseUrl + req.path;
                    if (allowedRoutes.includes(currentRoute)) {
                        // El usuario tiene acceso, continuar con la solicitud
                        next();
                    } else {
                        // El usuario no tiene permisos para acceder a esta ruta
                        return res.status(403).json({ error: "No tienes permiso para acceder a esta ruta" });
                    }

                    /* if (userRoleId === 1) { // Supongamos que 1 es el ID del rol de administrador
                        // El usuario tiene acceso, continuar con la solicitud
                        next();
                    } else {
                        // El usuario no tiene permisos para acceder a esta ruta
                        return res.status(403).json({ error: "No tienes permiso para acceder a esta ruta" });
                    } */
                });
            }
        });
    }
});

module.exports = router;

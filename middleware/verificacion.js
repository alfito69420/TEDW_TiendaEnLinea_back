const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.use((req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        res.status(401).send({ error: 'Es necesario un token de autenticación' });
        return;
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, 'shhh', (error, decoded) => {
            if (error) {
                return res.json({ message: "El token no es válido" });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }
});

module.exports = router;

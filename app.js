const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const bodyParse = require('body-parser')
require('./database/MySQLConnections')

//app.use(cookieParser())
app.use(express.json())
app.use(bodyParse.urlencoded({extended: true}))
app.use(bodyParse.json({extended:true}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-API-key, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "Get, Put, Post, Delete, Options");
    res.header("Allow", "Get, Put, Post, Delete, Options");
    next();
});

/* app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); */

//  Para procesar todos los datos enviados desde forms
//app.use(express.urlencoded({extended:true}))


//  Llamar al Enrutador
const categoryRoutes = require('./routes/categoryRoutes')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const direccionRoutes = require('./routes/direccionRoutes')
const ordenRoutes = require('./routes/ordenRoutes')

//  Rutas
app.use('/api/v1/categories', categoryRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/direccion', direccionRoutes)
app.use('/api/v1/orden', ordenRoutes)

app.get('/', (req, res) => res.send('¡Hola Mundo!'));
app.listen(port, () => console.log(`Server Up Running in Port: ${port}!`));

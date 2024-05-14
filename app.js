const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookieparser');

app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//  Para procesar todos los datos enviados desde forms
/* app.use(express.urlencoded({extended:true}))


//  Para trabajar con las cookies
app.use(cookieParser);
 */

//  Llamar 
require('./database/MySQLConnections')

//  Llamar al Enrutador
const parkingRoutes = require('./routes/Routes')
app.use('/api/v1', parkingRoutes)

app.get('/', (req, res) => res.send('¡Hola Mundo!'));
app.listen(port, () => console.log(`Server Up Running in Port: ${port}!`));

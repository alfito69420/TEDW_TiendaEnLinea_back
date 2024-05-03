const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

require('./database/MySQLConnections')
const parkingRoutes = require('./routes/ParkingRoutes')

app.use('/api/v1', parkingRoutes)

app.get('/', (req, res) => res.send('¡Hola Mundo!'));
app.listen(port, () => console.log(`¡La aplicación de ejemplo está escuchando en el puerto ${port}!`));

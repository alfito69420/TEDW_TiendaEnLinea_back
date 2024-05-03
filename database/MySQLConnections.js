const mysql = require('mysql');

const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_DB,
  password: process.env.PASSWORD,
  database: process.env.DB
});

/*
const connection = mysql.createConnection({
  host: "localhost",
  user: "admin_ecomerce",
  password: "123",
  database: "ecomerce"
});
*/
connection.connect();

//const connectionObj = connection.connect();
/*
connectionObj.on('connected', ()=> {
    console.log('MongoDB connection successful')
})

connectionObj.on('error', ()=> {
    console.log('MongoDB connection failed...')
})
*/

exports.databaseConnection = connection;
const mysql = require('mysql');

const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_DB,
  password: process.env.PASSWORD,
  database: process.env.DB
});

connection.connect();

exports.databaseConnection = connection;
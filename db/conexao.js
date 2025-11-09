// db/conexao.js
const mysql = require('mysql2');


const pool = mysql.createPool({
  host: 'localhost', 
  port: 3310,
  user: 'root',
  password: 'root',
  database: 'formulario',
});

module.exports = pool.promise(); 

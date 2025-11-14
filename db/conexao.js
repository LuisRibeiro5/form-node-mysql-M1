// db/conexao.js
const mysql = require('mysql2/promise');


const pool = mysql.createPool({
  host: 'localhost', 
  port: 3310,
  user: 'root',
  password: 'root',
  database: 'formulario',
});

module.exports = pool; 

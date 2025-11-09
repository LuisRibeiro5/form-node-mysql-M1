// db/conexao.js
const mysql = require('mysql2');

// cria uma pool (melhor para performance)
const pool = mysql.createPool({
  host: 'localhost', 
  port: 3310,
  user: 'root',
  password: 'root',
  database: 'formulario',
});

// exporta para poder usar em outros arquivos
module.exports = pool.promise(); // <- permite usar async/await

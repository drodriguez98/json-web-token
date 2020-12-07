const mysql = require("mysql2");

/* Creando la Conexion a la Base de Datos */

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "agustin2020",
  database: "LOGUEO",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;

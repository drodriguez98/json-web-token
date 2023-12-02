import mysql from "mysql2";

/* Conexion a la Base de Datos */

const pool = mysql.createPool({

  host: "localhost",
  user: "jwt",
  password: "abc123.",
  database: "jwtdb2",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

});

export default pool;
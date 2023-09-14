const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sila-1234',
  database: 'delivery',
  port: 3306
});

db.connect((error) => {
  if(error) throw error;
  console.log('DATABASE CONNECTED!!!');
})

module.exports = db;

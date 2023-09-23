const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

User.findByEmail = async (email, result) => {
  const sql = `
    SELECT id, email, name, last_name, image, password FROM users
    WHERE email = ?;
  `;
  db.query(sql, [email], (error, resultSet) => {
    if(error){
      console.error('Error: ', error);
      result(error, null);
    }else{
      console.log('Usuario obtenido: ', resultSet[0]);
      result(null, resultSet[0]);
    }
  });
};


User.findById = async (id, result) => {
  const sql = `
    SELECT id, email, name, last_name, image, password FROM users
    WHERE id = ?;
  `;
  db.query(sql, [id], (error, resultSet) => {
    if(error){
      console.error('Error: ', error);
      result(error, null);
    }else{
      console.log('Usuario obtenido: ', resultSet[0]);
      result(null, resultSet[0]);
    }
  });
};

User.create = async (user, promise) => {
  const hash = await bcrypt.hash(user.password, 10);
  const sql = `
    INSERT INTO users (email, name, last_name, phone, image, password, created_at, updated_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, 
    [user.email, user.name, user.last_name, user.phone, user.image, hash, new Date(), new Date()],
    (error, res) => {
      if(error){
        console.error(error);
        db.rollback(() => {
          promise(error, null);
        });
      }else{
        console.log(res.insertId);
        db.commit(() => {
          promise(null, res.insertId);
        });
      }
    }
  );
};

module.exports = User;

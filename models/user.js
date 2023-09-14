const db = require('../config/config');

const User = {};

User.create = (user, promise) => {
  const sql = `
    INSERT INTO users (email, name, last_name, phone, image, password, created_at, updated_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, 
    [user.email, user.name, user.last_name, user.phone, user.image, user.password, new Date(), new Date()],
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

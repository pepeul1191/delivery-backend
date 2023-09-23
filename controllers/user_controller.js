const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')

module.exports = {
  login(req, res){
    const email = req.body.email;
    const password = req.body.password;
    User.findByEmail(email, async (error, user) => {
      if(error){
        return res.status(501).json({
          success: false,
          message: 'Hubo un error ---',
          error: error
        });
      }
      if(!user){
        // el cliente no tiene autorización para realizar esta petición(401)
        return res.status(401).json({
          success: false,
          message: 'El email no fue encontrado',
        });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if(isPasswordValid){
        const token = jwt.sign({id: user.id, email: user.email}, keys.secretOrKey, {});
        const data = {
          id: user.id, 
          name: user.name,
          lastName: user.last_name,
          email: user.email,
          phone: user.phone,
          image: user.image,
          session_token: `JWT ${token}`
        };
        return res.status(201).json({
          success: true,
          message: 'El usuario fue autenticado', 
          data: data
        })
      }else{
        return res.status(401).json({
          success: false,
          message: 'El password es incorrecto',
        });
      }
    })
  },
  register(req, res){
    const user = req.body;
    User.create(user, (error, data) => {
      if(error){
        return res.status(501).json({
          success: false, 
          message: 'Hubo un error con el registro del usuario',
          error: error
        });
      }else{
        return res.status(201).json({
          success: true, 
          message: 'El registro se realizó correctamente',
          data: data // es el id del usuario que se registró
        });
      }
    });
  },
};
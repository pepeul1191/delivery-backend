const User = require('../models/user');

module.exports = {
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
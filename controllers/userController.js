const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../config/jwtToken');
const { get } = require('mongoose');


const createUserCtrl = asyncHandler(async (req, res) => {
  const  email = req.body.email;
  const user = await User.findOne({email: email});
  if (!user) {
    // const newUser = new User(req.body);
    const newUser = User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error('El usuario ya existe (email o teléfono');
  };
})
// -_- ------------- controlador del login ------------- -_- //
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(`email logueado: ${email}, password logueado: ${password}`);
  // -_- buscar el usuario existe o no en la base de datos
  const user = await User.findOne({ email });
  // -_- si el usuario no existe
  if (!user) {
    throw new Error('Usuario no encontrado');
  } else {
      // -_- si el usuario existe, comparar la contraseña
      const isMatched = await user.isPasswordMatched(password);
      if (isMatched) {
        res.json({ 
          _id: isMatched?._id,
          name: isMatched?.name,
          email: isMatched?.email,
          mobile: isMatched?.mobile,
          token: generateToken(isMatched?._id),
      });
      } else {
        throw new Error('Contraseña incorrecta');
      }
  }
})

// -_- ------------- obtener todos los usuarios ------------- -_- //
const getUsersCtrl = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
      throw new Error('No se pudo obtener todos los usuarios');
  }
}
)
// -_- ------------- obtener un usuario por id ------------- -_- //
const getUserByIdCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getUserByIdCtrl = await User.findById(id)
    res.json(getUserByIdCtrl);
    console.log(`id usuario: ${id}`);
} catch (error) {
    throw new Error('No se pudo obtener el usuario');
  }
}
)
// -_- ------------- borrar un usuario por id ------------- -_- //
const deleteUserCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUserByIdCtrl = await User.findByIdAndDelete(id)
    res.json(deleteUserCtrl);
    console.log(`id usuario eliminado: ${id}`);
} catch (error) {
    throw new Error('No se pudo borrar el usuario');
  }
}
)
// -_- ------------- actualizar a un usuario ------------- -_- //
const updateUserCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updateUserCtrl = await User.findByIdAndUpdate (id, {
      name: req?.body?.name,
      email: req?.body?.email,
      mobile: req?.body?.mobile,
    }, {new: true}
  )
    res.json(updateUserCtrl);
    console.log(`id usuario actualizado: ${id}`);
} catch (error) {
    throw new Error('No se pudo actualizar el usuario');
  }
}
)



// -_- ------------- exportar los controladores ------------- -_- //
module.exports = { createUserCtrl, loginUserCtrl, getUsersCtrl, getUserByIdCtrl, deleteUserCtrl, updateUserCtrl };
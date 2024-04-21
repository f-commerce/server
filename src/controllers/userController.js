// -_- ------------- crear un usuario ------------- -_- //
 export const createUserCtrl =  (req, res) => {

    res.json('creando usuario');
 
}

// -_- ------------- obtener todos los usuarios ------------- -_- //
export const getUsersCtrl =  (req, res) => {
  res.json('obtenidos todos los usuarios');
}

// -_- ------------- obtener un usuario por id ------------- -_- //
export const getUserByIdCtrl =  (req, res) => {
  res.json('obtenido un usuario por id');
}

// -_- ------------- actualizar un usuario por id ------------- -_- //
export const updateUserByIdCtrl =  (req, res) => {
  res.json('actualizado un usuario por id');
} 

// -_- ------------- eliminar un usuario por id ------------- -_- //
export const deleteUserByIdCtrl =  (req, res) => {
  res.json('eliminado un usuario por id');
} 



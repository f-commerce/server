const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');


// Declarar el esquema de Mongoose 
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'user',
    },
});

// -_- Hashear la contraseña antes de guardarla en la base de datos
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});
// -_- Comparar contraseña
userSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

//-_- Exportar el modelo
module.exports = mongoose.model('User', userSchema);
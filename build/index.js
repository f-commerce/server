"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
var dotenv = require('dotenv').config();
var PORT = process.env.PORT || 4000;
var dbConnect = require('../config/dbConnect');
var authRoute = require('../routes/authRoute');
var bodyParser = require('body-parser');
var _require = require('../middlewares/errorHandler'),
  notFound = _require.notFound,
  errorHandler = _require.errorHandler;
dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use('/' , (req, res) => {
//   res.send('Bienvenido a la pagina de inicio del lado del servidor')
//   })
app.listen(PORT, function () {
  console.log("Servidor escuchando en el puerto:".concat(PORT));
});

// -_- rutas para utilizar por los usuarios
app.use('/api/user', authRoute);

// -_- middlewares para manejar errores
app.use(notFound);
app.use(errorHandler);
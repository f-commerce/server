const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000
const dbConnect = require('./config/dbConnect')
const authRoute = require('./routes/authRoute')
const bodyParser = require('body-parser')
const { notFound, errorHandler } = require('./middlewares/errorHandler')

dbConnect()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/' , (req, res) => {
//   res.send('Bienvenido a la pagina de inicio del lado del servidor')
//   })
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto:${PORT}`)
  })

  // -_- rutas para utilizar
  app.use('/api/user', authRoute)
  
  
  
  // -_- middlewares para manejar errores
  app.use(notFound)
  app.use(errorHandler)


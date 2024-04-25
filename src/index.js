import app from './config/app.js'
import dbConnect from './config/dbConnect'
// import { notFound, errorHandler } from './middlewares/errorHandler'
// import authRoute from './routes/authRoute'
// import bodyParser from 'body-parser'



require('dotenv').config()
const PORT = process.env.PORT || 4000

dbConnect()

// app.use(bodyParser.urlencoded({ extended: true }));






// app.use('/' , (req, res) => {
//   res.send('Bienvenido a la pagina de inicio del lado del servidor')
//   })
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto:${PORT}`)
  })


  
  
  // -_- middlewares para man
  // app.use(notFound)
  // app.use(errorHandler)
  
  
  


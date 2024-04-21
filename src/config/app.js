// -_- ----------- Este script es el encargado de configurar el servidor express y utilizar las distintas rutas para luego ser exportardo y utilizado en el archivo index.js -------------- -_-
import express from 'express'
import morgan from 'morgan' // -_- middleware (función) de express para ver las peticiones que se hacen al servidor
import pkg from '../../package.json'
import productsRoutes from '../routes/productsRoutes.js'
import authRoutes from '../routes/authRoutes.js'
import { createRoles } from '../libs/initialSetup.js'
import usersRoutes from '../routes/userRoutes.js'
import adminAuthRoutes from '../routes/adminAuthRoutes.js'

const app = express()
createRoles()
// -_- ---------- establece el objeto pkg en la aplicación express (para reutilizar la información del package.json) asignando un nombre 'pkg' a la variable para firmar con la info de nuestra app ---------- -_- //
app.set('pkg', pkg)
// -_- ----------  middleware de express para que el servidor pueda entender los objetos json que se envían desde el cliente, hemos eliminado bodyParser por eliminar emplejidad innecesaria ---------- -_- //
app.use(express.json())
// -_- -------- morgan se encarga de mostrar en consola las peticiones que se hacen al servidor, es un middleware de express que se encarga de eso ---------- -_- //
app.use(morgan('dev'))
// -_- ---------- Ruta principal de la aplicación ---------- -_- //
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})
app.use('/api/users', usersRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/auth', authRoutes) // -_- Ruta de autenticación de usuarios



app.use('/api/auth/admin', adminAuthRoutes); // -_- Ruta de autenticación de administradores

// -_- Ruta de autenticación del administrador
// app.use('/api/auth', authRoutes)
// app.use('/api/admin/auth');
// -_- Ruta del panel de control protegida solo para administradores
// app.use('/api/admin');


// -_- ---------- Exportamos la aplicación express para ser utilizada en el archivo src/index.js ---------- -_- //
export default app

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import pkg from '../../package.json';
import productsRoutes from '../routes/productsRoutes.js';
import authRoutes from '../routes/authRoutes.js';
import { createRoles } from '../libs/initialSetup.js';
import usersRoutes from '../routes/userRoutes.js';
import adminAuthRoutes from '../routes/adminAuthRoutes.js';
import contactRoutes from '../routes/contactRoutes.js';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(cors());

// Configura el límite de tasa
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // número máximo de solicitudes permitidas por ventana
    message: 'Demasiadas solicitudes desde esta dirección IP, por favor, intenta nuevamente más tarde.',
});

createRoles();

app.set('pkg', pkg);

app.use(express.json());
app.use(morgan('dev'));

// Agregar el middleware de límite de tasa por IP a todas las solicitudes
app.use(limiter);

// -_- ---------- Ruta principal de la aplicación ---------- -_- //
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})
// -_- Ruta de autenticación de usuarios signin - signup
app.use('/api/auth', authRoutes) 

app.use('/api/users', usersRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/auth/admin', adminAuthRoutes); // -_- Ruta de autenticación de administradores

// -_- --------  RUTA CONTACTO ---------- -_- //
app.use('/api/contact', contactRoutes)

// -_- -------- FALTA RUTA DASHBOARD ADMINISTRADOR ---------- -_- //
//app.get('/dashboard')

// -_- ---------- Exportamos la aplicación express para ser utilizada en el archivo src/index.js ---------- -_- //
export default app;

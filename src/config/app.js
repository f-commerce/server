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
import securityRoutes from '../routes/securityEventRoutes.js';
import { logSecurity } from '../middlewares/securityEventMiddleware.js';
import rateLimit from 'express-rate-limit';
import AccessControl from'express-ip-access-control';


const app = express();
app.use(cors());



createRoles();

app.set('pkg', pkg);

app.use(express.json());
app.use(morgan('dev'));
// Configura el límite de tasa
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // número máximo de solicitudes permitidas por ventana
    message: 'Demasiadas solicitudes desde esta dirección IP, por favor, intenta nuevamente más tarde.',
});
app.use(limiter);

// ******-_-* --------- CYBER MIDDLEWARE con las opciones extras PARA CREAR LISTA NEGRA DE IP --------- *-_-* //
// middleware de límite de tasa por IP a todas las solicitudes
const options = {
    mode: 'deny', // Modo de control de acceso: 'deny' (lista negra)
    denys: ['IP_MALICIOSA_1', 'IP_MALICIOSA_2'], // Lista negra de direcciones IP maliciosas
    allows: [], // Lista blanca (vacía para permitir todas las demás IP)
    forceConnectionAddress: false, // No fuerza la dirección de conexión
    log: function(clientIp, access) {
        // Función de registro para mostrar si la solicitud se permitió o se denegó
        console.log(clientIp + (access ? ' accedido.' : ' denegado.'));
    },
    statusCode: 401, // Código de estado HTTP en caso de denegación
    redirectTo: '', // URL de redirección en caso de denegación
    message: 'No autorizado' // Mensaje en caso de denegación sin redirección
};
// *-_-* --------- FINAL DEL CYBERMIDDLEWARE con las opciones extras PARA CREAR LISTA NEGRA DE IP --------- *-_-* //

// Middleware de registro de seguridad
app.use(logSecurity);



// Middleware para verificar solicitudes entrantes y guardarlas en la base de datos
const accessControlMiddleware = AccessControl(options);
app.use(accessControlMiddleware);

// Middleware para verificar solicitudes entrantes
app.use((req, res, next) => {
    // Coloca aquí la lógica para verificar la solicitud
    // Por ejemplo, verifica la IP del cliente
    const clientIP = req.ip; // Obtiene la IP del cliente
    // Aquí puedes realizar la lógica para verificar si la IP está en la lista de IPs maliciosas
    // Si la IP está en la lista, bloquea la solicitud y responde con un mensaje adecuado
    // De lo contrario, permite que la solicitud continúe hacia las rutas
    next();
});


// -_- ---------- Ruta principal de la aplicación ---------- -_- //
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})
// -_- Ruta de autenticación de usuarios 
app.use('/api/auth', authRoutes) 
// Ruta para obtener todos los registros de seguridad de la bd
app.use('/api/security', securityRoutes);
// -_- Rutas de usuarios y productos
app.use('/api/users', usersRoutes)
app.use('/api/products', productsRoutes)
// -_- Ruta de autenticación de administradores
app.use('/api/auth/admin', adminAuthRoutes); 
// -_- --------  RUTA CONTACTO ---------- -_- //
app.use('/api/contact', contactRoutes)



// -_- ---------- Exportamos la aplicación express para ser utilizada en el archivo src/index.js ---------- -_- //
export default app;

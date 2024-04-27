import express from 'express';
import { getAllSecurityLogs } from '../controllers/SecurityEventController.js';

const router = express.Router();

// Ruta para obtener todos los registros de seguridad
router.get('/security/logs', getAllSecurityLogs);


export default router;

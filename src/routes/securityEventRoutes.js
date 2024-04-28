import express from 'express';
import {  getAllSecurityLogs, blockIP, unblockIP  } from '../controllers/SecurityEventController.js'; // Asegúrate de tener la ruta correcta


const router = express.Router();

// Ruta para obtener todos los registros de seguridad
router.get('/logs', getAllSecurityLogs)

// -_- ------------- Rutas para IP maliciosas ------------- -_- //

// Actualizar un registro de seguridad (bloquear/desbloquear IP)
router.put('/logs/:id', blockIP);
router.put('/logs/:id', unblockIP);


export default router;

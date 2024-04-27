import express from 'express';
import { getAllBlockedIPs, getAllSecurityLogs,  blockIP, unblockIP } from '../controllers/SecurityEventController.js'; // Asegúrate de tener la ruta correcta


const router = express.Router();

// Ruta para obtener todos los registros de seguridad
router.get('/logs', getAllSecurityLogs)

// -_- ------------- Rutas paraIP maliciosas ------------- -_- //
// Ruta para obtener todas las IPs bloqueadas
router.get('/blocked-ips', getAllBlockedIPs);

// Ruta para bloquear una IP
router.post('/block-ip', blockIP);

// Ruta para desbloquear una IP
router.post('/unblock-ip', unblockIP);


export default router;

import SecurityLog from '../models/securityEventModel.js';

// Controlador para crear un nuevo registro de seguridad
export const createSecurityLog = async (req, res) => {
    try {
        const newSecurityLog = new SecurityLog(req.body);
        await newSecurityLog.save();
        res.status(201).json(newSecurityLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener todos los registros de seguridad
 export const getAllSecurityLogs = async (req, res) => {
     try {
        const securityLogs = await SecurityLog.find();
        res.status(200).json(securityLogs);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los registros de seguridad', error: error.message });
     }
 };

 // Controlador para obtener todas las IPs bloqueadas
export const getAllBlockedIPs = async (req, res) => {
    try {
        const blockedIPs = await SecurityLog.distinct('clientIP', { isBlocked: true });
        res.status(200).json(blockedIPs);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las IPs bloqueadas', error: error.message });
    }
};

// Controlador para bloquear una IP
export const blockIP = async (req, res) => {
    const { ip } = req.body;
    try {
        await SecurityLog.updateMany({ clientIP: ip }, { isBlocked: true });
        res.status(200).json({ message: `La IP ${ip} ha sido bloqueada` });
    } catch (error) {
        res.status(500).json({ message: 'Error al bloquear la IP', error: error.message });
    }
};

// Controlador para desbloquear una IP
export const unblockIP = async (req, res) => {
    const { ip } = req.body;
    try {
        await SecurityLog.updateMany({ clientIP: ip }, { isBlocked: false });
        res.status(200).json({ message: `La IP ${ip} ha sido desbloqueada` });
    } catch (error) {
        res.status(500).json({ message: 'Error al desbloquear la IP', error: error.message });
    }
};



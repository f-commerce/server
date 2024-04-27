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



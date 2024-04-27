import SecurityLog from '../models/securityEventModel.js';


// -_- ------------ Este middleware maneja la lógica de bloqueo de IPs y el registro de seguridad ------------ -_-  //
export const logSecurity = async (req, res, next) => {
    try {
        const isBlocked = await checkIfIPisBlocked(req.ip);
        if (isBlocked) {
            await logBlockedAccess(req, res);
            return res.status(403).json({ message: 'Acceso bloqueado. Esta IP está en la lista de IPs maliciosas.' });
        }
        await logNormalAccess(req, res);
        next();
    } catch (error) {
        console.error('Error al crear el registro de seguridad:', error);
        next(error);
    }
};

// Función para registrar un acceso bloqueado
const logBlockedAccess = async (req, res) => {
    const newLog = new SecurityLog({
        timestamp: new Date(),
        eventType: 'Blocked Access Attempt',
        clientIP: req.ip,
        requestPath: req.path,
        requestParams: req.params,
        userAgent: req.get('User-Agent'), 
        sessionID: req.sessionID,
        httpMethod: req.method, 
        httpStatus: res.statusCode, 
        requestHeaders: req.headers, 
        responseHeaders: res.headers, 
        requestBody: req.body, 
        actionsTaken: 'Blocked',
        securityCheckResult: 'Blocked'
    });
    await newLog.save();
};

// Función para registrar un acceso normal
const logNormalAccess = async (req, res) => {
    const newLog = new SecurityLog({
        timestamp: new Date(),
        eventType: 'Access',
        clientIP: req.ip,
        requestPath: req.path,
        requestParams: req.params,
        userAgent: req.get('User-Agent'), 
        sessionID: req.sessionID,
        httpMethod: req.method, 
        httpStatus: res.statusCode, 
        requestHeaders: req.headers, 
        responseHeaders: res.headers, 
        requestBody: req.body, 
        actionsTaken: 'Allow',
        securityCheckResult: 'Allowed'
    });
    await newLog.save();
};

// Función para verificar si la IP está bloqueada
const checkIfIPisBlocked = async (ip) => {
    // Aquí implementa la lógica para verificar si la IP está en la lista de IPs maliciosas y está bloqueada.
    // Por ejemplo, puedes consultar tu base de datos o almacenamiento de IPs bloqueadas.
    // Retorna true si la IP está bloqueada, de lo contrario retorna false.
    // Implementa la lógica de acuerdo a cómo estés manejando la lista de IPs maliciosas en tu aplicación.
    return false; // Por defecto, no se bloquea la IP
};

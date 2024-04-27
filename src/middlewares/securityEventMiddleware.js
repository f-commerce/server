import SecurityLog from '../models/securityEventModel.js';

export const logSecurity = async (req, res, next) => {
    try {
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
            // actionsTaken: 'Allow',
            // attackType: 'None',
            // securityCheckResult: 'Allowed'
         
        });
        await newLog.save();
        next();
    } catch (error) {
        console.error('Error al crear el registro de seguridad:', error);
        next(error);
    }
};
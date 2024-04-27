import { Schema, model } from 'mongoose';

const securityLogSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    eventType: String,
    description: String,
    clientIP: String,
    requestPath: String,
    requestParams: Object,
    userAgent: String, // -_- ------------ Detalles del agente de usuario
    sessionID: String, //-_- ------------ ID de sesión
    userID: String, // -_- ------------ ID de usuario
    httpMethod: String, // -_- ------------ Método HTTP utilizado
    httpStatus: Number, // -_- ------------ Código de estado HTTP
    requestHeaders: Object, // -_- ------------ Cabeceras de la solicitud
    responseHeaders: Object, // -_- ------------ Cabeceras de la respuesta
    requestBody: Object, // -_- ------------ Cuerpo de la solicitud
    actionsTaken: String, // -_- ------------ Acciones tomadas
    attackType: String, // -_- ------------ Tipo de ataque detectado
    securityCheckResult: String // -_- ------------ Resultado de la verificación de seguridad
   
});

export default model('SecurityLog', securityLogSchema);

// -_- ------------ Endpoint para login y registro de usuarios ---------------- -_-
import { Router } from 'express';
import * as authCtrl from '../controllers/authController';
import { verifySignup } from '../middlewares/index';

const router = Router();
// -_- ------------------- Ruta de autenticación para login SOLO usuario ------------------- -_- //
router.post('/signin', authCtrl.signIn)

// -_- ------------------- Ruta de autenticación para registro de usuario ------------------- -_- //
router.post('/signup', [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted], authCtrl.signUp)


export default router;




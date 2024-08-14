import express from 'express';

const router = express.Router();

import {
    createUser,
    loginUser,
    logoutUser,
} from '../controllers/usersControllers.js';
import {
    authenticate,
    authorizeAdmin,
} from '../middlewares/authenticateHandler.js';

router.route('/').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

export default router;

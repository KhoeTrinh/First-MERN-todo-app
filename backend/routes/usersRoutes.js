import express from 'express';

const router = express.Router();

import {
    createUser,
    loginUser,
    logoutUser,
    getUser,
    updateUser,
    getAllUsers,
} from '../controllers/usersControllers.js';
import {
    authenticate,
    authorizeAdmin,
} from '../middlewares/authenticateHandler.js';

router
    .route('/')
    .get(authenticate, authorizeAdmin, getAllUsers)
    .post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router
    .route('/profile')
    .get(authenticate, getUser)
    .put(authenticate, updateUser);

export default router;

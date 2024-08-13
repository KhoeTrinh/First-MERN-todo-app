import express from 'express';

const router = express.Router();

import {
    createUser,
    loginUser,
} from '../controllers/usersControllers.js';

router.route('/').post(createUser);
router.route('/login').post(loginUser);

export default router;

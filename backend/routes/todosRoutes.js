import express from 'express';
const router = express.Router();

import {
    authenticate,
    authorizeAdmin,
} from '../middlewares/authenticateHandler.js';

router.route('/')

export default router

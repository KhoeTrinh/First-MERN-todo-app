import express from 'express';
const router = express.Router();

import {
    createTodotypes,
    getTodotypes,
    putTodotypes,
    deleteTodotypes,
} from '../controllers/todotypesControllers.js';

import {
    authenticate,
    authorizeAdmin,
} from '../middlewares/authenticateHandler.js';

router.route('/').post(createTodotypes);
router
    .route('/:id')
    .get(getTodotypes)
    .put(putTodotypes)
    .delete(deleteTodotypes);

export default router;

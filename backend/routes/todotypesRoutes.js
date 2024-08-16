import express from 'express';
const router = express.Router();

import {
    createTodotypes,
    getAllTodotypes,
    putTodotypes,
    deleteTodotypes,
} from '../controllers/todotypesControllers.js';

import {
    authenticate,
    authorizeAdmin,
} from '../middlewares/authenticateHandler.js';

router.route('/').post(createTodotypes);
router.route('/todotypes').get(getAllTodotypes);
router
    .route('/:id')
    .put(putTodotypes)
    .delete(deleteTodotypes);

export default router;

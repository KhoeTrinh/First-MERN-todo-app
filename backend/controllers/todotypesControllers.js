import Todotype from '../models/todotypesModels.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const createTodotypes = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res
                .status(400)
                .json({
                    message: 'Please provide a name for the todo type.',
                });
        }
        const existingTodotypes = await Todotype.findOne({ name });
    } catch (err) {}
});
const getTodotypes = asyncHandler(async (req, res) => {});
const putTodotypes = asyncHandler(async (req, res) => {});
const deleteTodotypes = asyncHandler(async (req, res) => {});

export { createTodotypes, getTodotypes, putTodotypes, deleteTodotypes };

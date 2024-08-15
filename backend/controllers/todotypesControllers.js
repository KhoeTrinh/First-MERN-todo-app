import Todotype from '../models/todotypesModels.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const createTodotypes = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: 'Please provide a name for the todo type.',
            });
        }
        const existingTodotypes = await Todotype.findOne({ name });
        if (existingTodotypes) {
            return res.status(400).json({
                message: 'A todo type with this name already exists.',
            });
        }
        const newTodotype = (await Todotype.create({ name })).save();
        res.json(newTodotype)
    } catch (err) {}
});
const getTodotypes = asyncHandler(async (req, res) => {});
const putTodotypes = asyncHandler(async (req, res) => {});
const deleteTodotypes = asyncHandler(async (req, res) => {});

export { createTodotypes, getTodotypes, putTodotypes, deleteTodotypes };

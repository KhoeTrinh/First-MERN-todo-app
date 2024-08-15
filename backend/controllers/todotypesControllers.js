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
        const newTodotype = await Todotype.create({ name }).save();
        res.json(newTodotype);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});
const getTodotypes = asyncHandler(async (req, res) => {
    try {
        const todo = await Todotype.findById(req.params.id);

        if (!todo) {
            return res
                .status(404)
                .json({ message: 'Todo type not found' });
        }
        res.json(todo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});
const putTodotypes = asyncHandler(async (req, res) => {
    try {
        const todo = await Todotype.findById(req.params.id);
        if (todo) {
            todo.name = req.body.name || todo.name;
            if (!todo.name) {
                return res.status(400).json({
                    message: 'Please provide a name for the todo type.',
                });
            }
            const updatedTodotypes = await todo.save();
            res.json(updatedTodotypes);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});
const deleteTodotypes = asyncHandler(async (req, res) => {
    try {
        const todo = await Todotype.findByIdAndDelete(req.params.id);

        if (!todo) {
            return res
                .status(404)
                .json({ message: 'Todo type not found' });
        }
        res.json({ message: 'Todo type deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

export { createTodotypes, getTodotypes, putTodotypes, deleteTodotypes };

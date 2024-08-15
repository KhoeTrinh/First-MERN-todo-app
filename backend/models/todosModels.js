import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    { timestamps: true }
);

const todoSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        todotype: {
            type: ObjectId,
            required: true,
            ref: 'Todotype',
        },
        reviews: [reviewSchema],
        isImportant: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Todo = mongoose.Schema('Todo', todoSchema);
export default Todo;

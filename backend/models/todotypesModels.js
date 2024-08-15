import mongoose from 'mongoose';

const todotypeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32,
        unique: true,
    },
});

const Todotype = mongoose.model('Todotype', todotypeSchema)

export default Todotype
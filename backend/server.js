import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';

import usersRoutes from './routes/usersRoutes.js';

const app = express();

dotenv.config()
connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/users', usersRoutes)

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port} 😂`);
});
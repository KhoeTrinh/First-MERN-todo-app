import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';

import usersRoutes from './routes/usersRoutes.js';
import todotypesRoutes from './routes/todotypesRoutes.js';
import todosRoutes from './routes/todosRoutes.js';

const app = express();

dotenv.config()
connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', usersRoutes)
app.use('/api/todotypes', todotypesRoutes)
app.use('/api/todos', todosRoutes)

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port} 😂`);
});
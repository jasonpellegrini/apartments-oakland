import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv';

import { userRouter } from './routes/users.js'
import { apartmentsRouter } from './routes/apartments.js'

dotenv.config({ path: '../server/src/.env' });

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/apartments", apartmentsRouter);

const password = process.env.DB_PASSWORD;
const user = process.env.DB_USERNAME;

mongoose.connect(`mongodb+srv://${user}:${password}@apartments-oakland-db.9rlokml.mongodb.net/apartments-oakland-db?retryWrites=true&w=majority`);
app.listen(3001, () => console.log("server running"))
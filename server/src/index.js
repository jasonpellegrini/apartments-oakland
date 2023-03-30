import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import { userRouter } from './routes/users.js'

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

mongoose.connect("mongodb+srv://jpellegrini1616:MERN@apartments-oakland-db.9rlokml.mongodb.net/apartments-oakland-db?retryWrites=true&w=majority");
app.listen(3001, () => console.log("server running"))
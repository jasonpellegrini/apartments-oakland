import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import { userRouter } from './routes/users.js'
import { apartmentsRouter } from './routes/apartments.js'

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

app.use("/apartments", apartmentsRouter);

mongoose.connect("mongodb+srv://jpellegrini1616:MERN@apartments-oakland-db.9rlokml.mongodb.net/apartments-oakland-db?retryWrites=true&w=majority");
app.listen(3001, () => console.log("server running"))
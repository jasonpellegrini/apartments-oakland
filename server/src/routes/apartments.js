import express from 'express';
import mongoose from 'mongoose';
import { ApartmentsModel } from "../models/Apartments.js";
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await ApartmentsModel.find({});
        res.json(response);
    }catch (err) {
        res.json(err);
    }
});

router.post("/", async (req, res) => {
    const apartment = new ApartmentsModel(req.body);
    try {
        const response = await apartment.save();
        res.json(response);
    }catch (err) {
        res.json(err);
    }
});

router.put("/", async (req, res) => {
    const apartment = await ApartmentsModel.findById(req.body.apartmentId)
    const user = await UserModel.findById(req.body.userId);
    const response = await apartment.save();
    user.savedApartments.push(apartment);
    await user.save();
    res.json({ savedApartments: user.savedApartments });
    try {
        const response = await apartment.save();
        res.json(response);
    }catch (err) {
        res.json(err);
    }
});

router.get("/savedApartments/ids", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userId);
        res.json({ savedApartments: user?.savedApartments })
    }catch (err) {
        res.json(err);
    }
})

router.get("/savedApartments", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userId);
        const savedApartments = await ApartmentsModel.find({
            _id: { $in: user.savedApartments },
        });
        res.json({ savedApartments })
    }catch (err) {
        res.json(err);
    }
})

export { router as apartmentsRouter };

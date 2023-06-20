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

router.post("/update", async (req,res) => {
    //const apartment = await ApartmentsModel.findById(req.body._id);
    const id = req.body._id;
    let comm = req.body.comments;
    
    //console.log("new id",req.body._id)
   // console.log("comments",req.body.comments);
    //console.log("apartment",apartment);

    try {
        const apartment = await ApartmentsModel.findById(req.body._id);
        if (!apartment) {
          return res.status(404).json({ error: "Apartment not found" });
        }

        apartment.comments = req.body.comments || apartment.comments;
        const updatedApartment = await apartment.save();
        
        return res.json(updatedApartment);
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    /*try {
        apartment.comments = req.body.comments || apartment.comments;
        const response = await apartment.save();
        console.log("response", response);
        res.json(response);
    } catch (err) {
        res.json(err)
    }*/

    /*try {

        console.log(comments);
        const response = await ApartmentsModel.updateOne(
            { "_id": req.body._id},
            { $set: { comments: req.body.comments } }
          );
          console.log("1234")
        console.log("response", response);
        res.json(response);
        
    } catch (err) {
        res.json(err)
    }*/
});

router.put("/", async (req, res) => {
    const apartment = await ApartmentsModel.findById(req.body.id);
    const user = await UserModel.findById(req.body.userID);
    try {
        user.savedApartments.push(apartment);
        await user.save();
        res.status(201).json({ savedApartments: user.savedApartments });
    }catch (err) {
        res.json(err);
    }
});

router.get("/savedApartments/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
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

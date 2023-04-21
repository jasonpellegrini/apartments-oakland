import mongoose from 'mongoose';

const ApartmentSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
});

export const ApartmentsModel = mongoose.model("apartments", ApartmentSchema)
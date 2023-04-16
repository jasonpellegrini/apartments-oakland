import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedApartments: [{ type: mongoose.Schema.Types.ObjectId, ref: "apartments" }],
});

export const UserModel = mongoose.model("users", UserSchema)
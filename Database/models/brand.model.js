import mongoose from "mongoose";

const schema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true,
        trim: true,
        minLength: [1, 'too short brand name']
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
    },
    logo: String,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }

}, { timestamps: true })
schema.post('init', (doc) => {

    doc.logo ? doc.logo = 'http://localhost:3000/' + "uploads/" + doc.logo : null


})

export const brandModel = new mongoose.model('brand', schema)
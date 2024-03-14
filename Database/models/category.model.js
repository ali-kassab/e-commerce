import mongoose from "mongoose";

const schema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true,
        trim: true,
        minLength: [2, 'too short category name']
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
    },
    image: String,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }

}, { timestamps: true })
schema.post('init', (doc) => {
    doc.image ? doc.image = 'http://localhost:3000/' + "uploads/" + doc.image : null
})
export const categoryModel = mongoose.model('category', schema)
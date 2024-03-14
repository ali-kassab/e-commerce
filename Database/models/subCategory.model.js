import mongoose from "mongoose";

const schema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true,
        trim: true,
        minLength: [2, 'too short subcategory name']
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    }, image: String
    , createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

export const subCategoryModel = new mongoose.model('subCategory', schema)
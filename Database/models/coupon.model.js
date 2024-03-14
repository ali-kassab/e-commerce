import mongoose from "mongoose";

const schema = mongoose.Schema({

    code: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    expires:Date,
    discount: {
        type: Number,
        required: true
    },createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }

}, { timestamps: true })

export const couponModel = new mongoose.model('Coupon', schema)
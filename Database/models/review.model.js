import mongoose from "mongoose";

const schema = mongoose.Schema({

    text: {
        type: String,
        trim: true,
        minLength: [2, 'too short review text'],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'product'
    },
    rateAvg: {
        type: Number,
        max: 5,
        min: 0,
        default: 0
    },
}, { timestamps: true })


schema.pre(/^find/, function () {
    this.populate({
        path: 'user',
        select: 'name'
    }).populate('product');
});
export const reviewModel = new mongoose.model('Review', schema)
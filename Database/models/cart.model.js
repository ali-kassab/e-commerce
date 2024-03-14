import mongoose from "mongoose";

const schema = mongoose.Schema({

    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    cartItems: [{
        product: { type: mongoose.Types.ObjectId, ref: 'product', required: true },
        price: Number,
        quantity: { type: Number, default: 1 }

    }]
    , totalPrice: Number,
    totalPriceAfterDiscount: Number,
    discount: Number

}, { timestamps: true })

export const cartModel = new mongoose.model('cart', schema)
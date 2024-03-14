import mongoose from "mongoose";

const schema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    orderItems: [{
        product: { type: mongoose.Types.ObjectId, ref: 'product' },
        price: Number,
        quantity: { type: Number, default: 1 }
    }]
    , totalPrice: Number,
    paymentMethod: {
        type: String,
        enum: ['cash', 'credit'],
        default: 'cash'
    }, shippingAddress: {
        street: String,
        city: String,
        phone: String
    }, isDeleverd: {
        type: Boolean,
        default: 'false'
    }, isDeleverd: Date
    , isPaid: {
        type: Boolean,
        default: 'false'
    }, isPaidAt: Date
}, { timestamps: true })

export const orderModel = new mongoose.model('Order', schema)
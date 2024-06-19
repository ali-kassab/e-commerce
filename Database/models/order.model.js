import mongoose from "mongoose";

const schema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    orderItems: [{
        product: { type: mongoose.Types.ObjectId, ref: 'product' },
        price: Number,
        quantity: { type: Number, default: 1 }
    }],
    totalPrice: Number,
    paymentMethod: {
        type: String,
        required: true,
        enum: ['cash', 'credit'],
        default: 'cash',
    },
        shippingAdress: {
        type: mongoose.Types.ObjectId,
        ref: 'addresses',
    }, isDeleverd: {
        type: Boolean,
        default: 'false'
    }, isDeleverd: Date,
    isPaid: {
        type: Boolean,
        default: 'false'
    }, isPaidAt: Date
}, { timestamps: true })

export const orderModel = new mongoose.model('order', schema)


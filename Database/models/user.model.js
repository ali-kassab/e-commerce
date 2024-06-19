import mongoose from "mongoose";
import bcrypt from "bcrypt";
const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    }, role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        lowercase: true
    }, passwordChangedAt: Date,
    wishList: [{
        type: mongoose.Types.ObjectId,
        ref: 'product'
    }],
    addresses: [{
        street: String,
        phone: String,
        city: String,
    }, { _id: true }],
}, { timestamps: true })

schema.pre('save', function () {
    if (this.password) this.password = bcrypt.hashSync(this.password, 8)
})
schema.pre('findOneAndUpdate', function () {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 8)
})


export const userModel = new mongoose.model('user', schema)
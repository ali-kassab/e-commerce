import mongoose from "mongoose";

const schema = mongoose.Schema({

    title: {
        type: String,
        required: [true, 'title is required'],
        trim: true,
        minLength: [2, 'too short product name'],
        maxLength: [300, 'too long product name']
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
        minLength: [10, 'too short product description'],
        maxLength: [500, 'too max product description'],
    },
    imageCover: String,
    images: [],
    price: {
        type: Number,
        min: 0,
        required: true
    },
    priceAfterDiscount: {
        type: Number,
        min: 0,
        required: true
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },
    sold: {
        type: Number,
        min: 0
    },
    rateAvg: {
        type: Number,
        max: 5,
        min: 0,
        default: 0
    },
    ratecount: {
        type: Number,
        default: 0,
        min: 0
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    },
    subCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'subCategory'
    }, brand: {
        type: mongoose.Types.ObjectId,
        ref: 'brand'
    }, createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }

}, { timestamps: true, toJSON: { virtuals: true } })

schema.post('init', (doc) => {
    if (doc.imageCover || doc.images) {
        doc.imageCover = 'http://localhost:3000/' + "uploads/" + doc.imageCover
        doc.images = doc.images?.map((img) => 'http://localhost:3000/' + "uploads/" + img)
    }
})

schema.virtual('Reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
});

schema.pre('findOne', function () {
    this.populate('Reviews')
})

export const productModel = new mongoose.model('product', schema)   
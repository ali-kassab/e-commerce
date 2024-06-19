import Joi from "joi";


export const addProductvali = {
    body: Joi.object({
        title: Joi.string().trim().min(2).max(300).required(),
        description: Joi.string().trim().min(10).max(500).required(),
        price: Joi.number().min(0).required(),
        priceAfterDiscount: Joi.number().min(0),
        quantity: Joi.number().min(0).required(),
        rateAvg: Joi.number().min(0).max(5),
        ratecount: Joi.number().min(0),
        category: Joi.string().required().length(24).hex(),
        subCategory: Joi.string().required().length(24).hex(),
        brand: Joi.string().required().length(24).hex(),
        createdBy: Joi.string().optional().length(24).hex(),

    }).options({ allowUnknown: false }),


    files: Joi.object({
        imageCover: Joi.object({
            fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            encoding: Joi.string().required(),
            mimetype: Joi.string().required().max(5242880).valid('image/png', 'image/jpeg'),
            size: Joi.number().required(),
            destination: Joi.string().required(),
            filename: Joi.string().required(),
            path: Joi.string().required(),
        }).required(),
        images: Joi.array().items(Joi.object({
            fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            encoding: Joi.string().required(),
            mimetype: Joi.string().required().max(5242880).valid('image/png', 'image/jpeg'),
            size: Joi.number().required(),
            destination: Joi.string().required(),
            filename: Joi.string().required(),
            path: Joi.string().required(),
        })).required()
    }).options({ allowUnknown: false })
}

export const paramIdvalidation = {
    params: Joi.object({
        id: Joi.string().required().length(24).hex()
    }).options({ allowUnknown: false })
}
export const updatevalidation = {
    params: Joi.object({
        id: Joi.string().required().length(24).hex()
    }).options({ allowUnknown: false }),

    body: Joi.object({
        title: Joi.string().trim().min(2).max(300),
        description: Joi.string().trim().min(10).max(500),
        price: Joi.number().min(0),
        priceAfterDiscount: Joi.number().min(0),
        quantity: Joi.number().min(0),
        sold: Joi.number().min(0),
        rateAvg: Joi.number().min(0).max(5),
        ratecount: Joi.number().min(0),
        category: Joi.string().length(24).hex(),
        subCategory: Joi.string().length(24).hex(),
        brand: Joi.string().length(24).hex(),
        createdBy: Joi.string().optional().length(24).hex(),
    }).options({ allowUnknown: false }), 

    files: Joi.object({
        imageCover: Joi.array().items(Joi.object({
            fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            encoding: Joi.string().required(),
            mimetype: Joi.string().required().max(5242880).valid('image/png', 'image/jpeg'),
            size: Joi.number().required(),
            destination: Joi.string().required(),
            filename: Joi.string().required(),
            path: Joi.string().required(),
        }).options({ allowUnknown: false })),
        images: Joi.array().items(Joi.object({
            fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            encoding: Joi.string().required(),
            mimetype: Joi.string().required().max(5242880).valid('image/png', 'image/jpeg'),
            size: Joi.number().required(),
            destination: Joi.string().required(),
            filename: Joi.string().required(),
            path: Joi.string().required(),
        })).options({ allowUnknown: false })
    })
}


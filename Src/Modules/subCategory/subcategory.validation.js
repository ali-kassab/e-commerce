import Joi from "joi";



export const addsubcategoryvali = {
    body: Joi.object({
        name: Joi.string().required().trim().min(2),
        category: Joi.string().required().length(24).hex(),
        image: Joi.object({
            fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            encoding: Joi.string().required(),
            mimetype: Joi.string().required().max(5242880).valid('image/png', 'image/jpeg'),
            size: Joi.number().required(),
            destination: Joi.string().required(),
            filename: Joi.string().required(),
            path: Joi.string().required(),
        })

    })
}

export const paramIdvalidationsub = {
    params: Joi.object({
        id: Joi.string().required().length(24).hex()
    })
}

export const updatevalidationsub = {
    body: Joi.object({
        name: Joi.string().trim().min(2),
        category: Joi.string().length(24).hex()
    }),
    params: Joi.object({
        id: Joi.string().required().length(24).hex(),

    })
}


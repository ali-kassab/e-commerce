import Joi from "joi";



export const addcategoryvali = {
    body: Joi.object({
        name: Joi.string().required().trim().min(2),
        file: Joi.object({
            img: Joi.object({
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
    }).required().options({ allowUnknown: false })
}

export const paramIdvalidation = {
    params: Joi.object({
        id: Joi.string().required().length(24).hex()
    }).options({ allowUnknown: false })
}

export const updatevalidation = {
    body: Joi.object({

        name: Joi.string().trim().min(2),

        image: Joi.object({
            fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            encoding: Joi.string().required(),
            mimetype: Joi.string().required().max(5242880),
            size: Joi.number().required().valid('image/png', 'image/jpeg', 'image/jpg'),
            destination: Joi.string().required(),
            filename: Joi.string().required(),
            path: Joi.string().required(),
        })
    }).options({ allowUnknown: false }),
     params: Joi.object({
        id: Joi.string().required().length(24).hex(),

    }).options({ allowUnknown: false })
}


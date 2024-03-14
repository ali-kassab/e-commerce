import Joi from "joi";



export const addcartVali = {
    body: Joi.object({
        product: Joi.string().required().length(24).hex(),
        quantity: Joi.number().optional().integer().options({ convert: false })
    })
}

export const paramIdvaliCart = {
    params: Joi.object({
        id: Joi.string().required().length(24).hex()
    })
}

export const updatevalidationcart = {
    body: Joi.object({
        product: Joi.string().required().length(24).hex(),
        quantity: Joi.number().optional().integer().options({ convert: false })
    }), params: Joi.object({
        id: Joi.string().required().length(24).hex()
    })
}


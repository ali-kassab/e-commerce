import Joi from "joi";



export const addAddressvali = {
    body: Joi.object({
        street: Joi.string().required().trim(),
        phone: Joi.string().required().trim(),
        city: Joi.string().required().trim()
    })
}

export const paramIdvaliaddress = {
    params: Joi.object({
        id: Joi.string().required().length(24).hex()
    })
}

export const updatevalidationAddress = {
    body: Joi.object({
        id: Joi.string().required().length(24).hex(),
        street: Joi.string().required().trim(),
        phone: Joi.string().required().trim(),
        city: Joi.string().required().trim()
    }),
    params: Joi.object({
        id: Joi.string().required().length(24).hex()
    })
}


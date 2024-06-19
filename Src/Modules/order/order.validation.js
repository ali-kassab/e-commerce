import Joi from "joi";


export const createOrderVali = {
    params: Joi.object({
        id: Joi.string().required().length(24).hex(),
    }),
    body: Joi.object({
        shippingAddress: Joi.string().required().length(24).hex().required(),
    }).options({ allowUnknown: false })
};

export const paramIdvaliorder = {
    params: Joi.object({
        id: Joi.string().required().length(24).hex(),
    }).options({ allowUnknown: false })
}

export const updatevalidationcart = Joi.object({
    id: Joi.string().required().length(24).hex(),
    quantity: Joi.number().optional().integer().options({ convert: false })
}).options({ allowUnknown: false })


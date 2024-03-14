import Joi from "joi";


export const createOrderVali = {
    params: Joi.object({
        id: Joi.string().required().length(24).hex(),
    }),
    body: Joi.object({
        shippingAddress: Joi.object({
            street: Joi.string().required(),
            city: Joi.string().required(),
            phone: Joi.string().required(),
        }).required(),
    })
};

export const paramIdvaliorder = {
    params: Joi.object({
        id: Joi.string().required().length(24).hex(),
    })
}

export const updatevalidationcart = Joi.object({
    id: Joi.string().required().length(24).hex(),
    quantity: Joi.number().optional().integer().options({ convert: false })
})


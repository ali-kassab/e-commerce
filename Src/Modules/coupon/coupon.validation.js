import Joi from "joi";



export const addcouponVali = {
    body: Joi.object({
        code: Joi.string().required().trim(),
        discount: Joi.number().required(),
        expires: Joi.date().required().greater('now').raw(),

    }).options({ allowUnknown: false })
}
export const couponVali = {
    body: Joi.object({
        coupon: Joi.string().required().trim(),
    }).options({ allowUnknown: false })
}

export const paramIdvaliCoupon = {
    params: Joi.object({
        id: Joi.string().required().length(24).hex()
    }).options({ allowUnknown: false })
}

export const updatevalidationCoupon = {
    body: Joi.object({
        code: Joi.string().trim(),
        discount: Joi.number(),
        expires: Joi.date(),
    }), params: Joi.object({
        id: Joi.string().required().length(24).hex()
    }).options({ allowUnknown: false })
}


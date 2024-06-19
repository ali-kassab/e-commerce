import Joi from "joi";



export const addReviewvali = {
    body: Joi.object({
        text: Joi.string().required().trim().min(2),
        product: Joi.string().required().length(24).hex(),
        rateAvg: Joi.number().required().min(0).max(5).default(0)
    }).options({ allowUnknown: false })
}
export const paramIdvalidationReview = {
    params: Joi.object({
        id: Joi.string().required().length(24).hex()
    }).options({ allowUnknown: false })
}

export const updatevalidationReview = {
    body: Joi.object({
        text: Joi.string().trim().min(2),
        rateAvg: Joi.number().min(0).max(5).default(0)
    }).options({ allowUnknown: false }),
    params: Joi.object({
        id: Joi.string().required().length(24).hex()
    }).options({ allowUnknown: false })
}


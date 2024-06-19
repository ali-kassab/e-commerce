import Joi from "joi";



export const addWishListvali = {
    body: Joi.object({
        product: Joi.string().required().length(24).hex()
    }).options({ allowUnknown: false })
}

export const paramIdvalidationWishList = {
    params: Joi.object({
        id: Joi.string().required().length(24).hex()
    }).options({ allowUnknown: false })
}




import Joi from "joi";



export const addUservali = {
    body: Joi.object({
        name: Joi.string().required().trim().min(1),
        email: Joi.string().required().trim().min(2).email(),
        password: Joi.string().required().pattern(/^[a-zA-Z0-9#@]{8,40}$/),
        rePassword: Joi.valid(Joi.ref('password')).required(),
        role: Joi.valid('user', 'admin').optional(),
    }).options({ allowUnknown: false })
}


export const paramIdvalidationUser = {
    params: Joi.object({
        id: Joi.string().required().length(24).hex()
    }).options({ allowUnknown: false })
}

export const updatevalidationUser = {

    body: Joi.object({
        name: Joi.string().trim().min(1),
        email: Joi.string().trim().min(2).email(),
        password: Joi.string().pattern(/^[a-zA-Z0-9#@]{8,40}$/),
        role: Joi.string().valid('user', 'admin')
    }).options({ allowUnknown: false })
}




import joi from 'joi'


export const signUpShecma = {
    body: joi.object({
        name: joi.string().min(3).max(10).required(),
        email: joi.string().email().required(),
        password: joi.string().required().pattern(/^[a-zA-Z0-9#@]{8,40}$/),
        rePassword: joi.valid(joi.ref('password')).required(),
        addresses: joi.object({
            street: joi.string().required(),
            phone: joi.string().required(),
            city: joi.string().required(),
        }).optional(),
        role: joi.string().required(),
    }).options({ allowUnknown: false })
}

export const loginShecma = {
    body: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required().pattern(/^[a-zA-Z0-9#@]{8,40}$/)
    })
}
export const changePasswordVali = {
    body: joi.object({
        password: joi.string().required().pattern(/^[a-zA-Z0-9#@]{8,40}$/),
        newPassword: joi.string().required().pattern(/^[a-zA-Z0-9#@]{8,40}$/)

    })
}

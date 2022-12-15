import Joi from 'joi';

const register = Joi.object({
    first_name: Joi.string().max(15).required(),
    last_name: Joi.string().max(15).required(),
    // phone_number: Joi.string().max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    // confirm_password: Joi.any().valid(Joi.ref('password')).required()
});

const login = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export default { register, login };
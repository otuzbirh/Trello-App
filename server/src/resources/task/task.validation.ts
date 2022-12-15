import Joi from 'joi';

const create = Joi.object({
    title: Joi.string().required(),
    body: Joi.string(),
    category: Joi.string().required()
});

const update = Joi.object({
    title: Joi.string(),
    body: Joi.string(),
    category: Joi.string()
});


export default { create, update };
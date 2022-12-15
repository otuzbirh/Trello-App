import Joi from 'joi';

const create = Joi.object({
  name: Joi.string().required(),
  user: Joi.string(),
});

const update = Joi.object({
  name: Joi.string().required(),
  user: Joi.string(),
});



export default { create, update };
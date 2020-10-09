import Joi from 'joi';

// Schema to validate post inputs.
export const postSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string(),
});

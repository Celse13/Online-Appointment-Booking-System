import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

class Validation {
  public static validateSignup(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      lastName: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(
          new RegExp('^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$'),
        )
        .required(),
      role: Joi.string().valid('client', 'business').required(),
      description: Joi.string().when('role', {
        is: 'business',
        then: Joi.required(),
        otherwise: Joi.forbidden(),
      }),
      phone: Joi.string().when('role', {
        is: 'business',
        then: Joi.required(),
        otherwise: Joi.forbidden(),
      }),
      location: Joi.string().when('role', {
        is: 'business',
        then: Joi.required(),
        otherwise: Joi.forbidden(),
      }),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    next();
  }

  public static validateLogin(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(
          new RegExp('^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$'),
        )
        .required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    next();
  }
}

export default Validation;

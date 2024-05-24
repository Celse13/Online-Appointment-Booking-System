import Joi from "joi";
import { Request, Response, NextFunction } from 'express';

class Validation {
    public static validateSignup(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            username: Joi.string().alphanum().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }


        next();
    }
    
    public static validateLogin(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });
    
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
    
        next();
    }
}


export default Validation;
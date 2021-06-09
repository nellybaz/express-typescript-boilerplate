import { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from "express";


export const validateInput = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const validationValue = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: true,
        convert: false,
        skipFunctions: true
    });
    if (validationValue.error) {
        const errorMessages = validationValue.error.details.map((error) => error.message);

        return res.status(422).json({ error: errorMessages });
    }

    return next();
};
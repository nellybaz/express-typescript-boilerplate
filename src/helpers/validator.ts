
import { ObjectSchema } from 'joi';

export function validateInput(
    schema: ObjectSchema,
    fields: { [key: string]: any }
): { [key: string]: any } | { error: string } {
    const validationResult = schema.validate(fields, {
        abortEarly: false,
        allowUnknown: true,
        convert: false,
        skipFunctions: true
    });
    if (validationResult.error) {
        return {
            error: validationResult.error.details.map((error) => error.message),
        };
    }
    return fields;
}


// const validator = (schema) => (req, res, next) => {
//     const validationValue = schema.validate(req.body, {
//         abortEarly: false,
//         allowUnknown: true,
//         convert: false,
//         skipFunctions: true
//     });
//     if (validationValue.error) {
//         const errorMessages = validationValue.error.details.map((error) => error.message);

//         return res.status(422).json({ error: errorMessages });
//     }

//     return next();
// };
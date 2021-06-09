import joi from "joi";

export const loginValidationSchema = joi.object({
    email: joi.string().trim().email({ minDomainSegments: 2 }).label("email")
        .required(),
    password: joi.string().trim().min(2).label("password")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;])(?=.{8,})/, "required password strength")
        .required(),
});
